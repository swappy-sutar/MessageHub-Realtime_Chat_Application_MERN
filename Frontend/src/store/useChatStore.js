import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../utils/axios";
import Cookies from "js-cookie";
import { useAuthStore } from "./useAuthStore";
import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_API_ENCRYPTION_KEY;

const decryptMessageText = (ciphertext) => {
  if (!ciphertext) return "";

  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedText || "[Unable to decrypt message]";
  } catch (error) {
    console.error("Decryption failed:", error);
    return "[Unable to decrypt message]";
  }
};

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const token = Cookies.get("token");
      const response = await axiosInstance.get("/messages/users", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      set({ users: response.data.data, isUserLoading: false });
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const token = Cookies.get("token");
      const response = await axiosInstance.get(`/messages/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const encryptedMessages = response.data?.data || [];

      const decryptedMessages = encryptedMessages.map((msg) => ({
        ...msg,
        text: decryptMessageText(msg.text),
      }));

      set({ messages: decryptedMessages });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
      console.log("Error fetching messages:", error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  sendMessage: async (formData) => {
    const token = Cookies.get("token");
    const { selectedUser, messages } = get();

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      const newMsg = res.data.data;

      newMsg.text = decryptMessageText(newMsg.text);

      set({ messages: [...messages, newMsg] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      throw error;
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;

      newMessage.text = decryptMessageText(newMessage.text);

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
    }
  },
}));
