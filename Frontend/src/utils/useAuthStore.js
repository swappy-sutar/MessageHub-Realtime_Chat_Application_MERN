import { create } from "zustand";
import { axiosInstance } from "./axios.js";

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

      set({authUser: response.data,});
    } catch (error) {
      console.error("Error checking CheckAuth:", error);
      set({authUser: null});
    }finally {
      set({isCheckingAuth: false});
    }
  },
}));

export { useAuthStore };
