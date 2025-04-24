import { create } from "zustand";
import { axiosInstance } from "./axios.js";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoading: false,
  isCheckingAuth: true,
  isUpdateProfile: false,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check-auth");

      set({ authUser: response.data });
    } catch (error) {
      console.error("Error checking CheckAuth:", error);

      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
      toast.success("Account created successfully!");
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(
        error.response.data.message || "Error signing up. Please try again."
      );
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await axiosInstance.post("/auth/logout");

      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error(
        error.response.data.message || "Error logging out. Please try again."
      );
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data });
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        error.response.data.message || "Error logging in. Please try again."
      );
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));

export { useAuthStore };
