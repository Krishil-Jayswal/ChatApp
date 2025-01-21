import { create } from "zustand";
import { toast } from "react-toastify";
import { axiosError, axiosInstance } from "../config/axios";
import { DEFAULT_MESSAGE } from "../config/constants";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isLoggingIn: false,
  isSigningUp: false,
  isCheckingAuth: false,
  isLoggingOut: false,

  signup: async ({ fullname, username, password, gender }) => {
    set({ isSigningUp: true });
    const success = get().validateProps(fullname, username, password, gender);
    if (!success) {
      set({ isSigningUp: false });
      return;
    }
    try {
      const response = await axiosInstance.post("/auth/signup", {
        fullname,
        username,
        password,
        gender,
      });
      set({ user: response.data.user, token: response.data.token });
      toast.success(response.data.message);
    } catch (error) {
      if (axiosError(error)) {
        toast.error(error.response?.data?.message || DEFAULT_MESSAGE);
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async ({ username, password }) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      set({ user: response.data.user, token: response.data.token });
      toast.success(response.data.message);
    } catch (error) {
      if (axiosError(error)) {
        toast.error(error.response?.data?.message || DEFAULT_MESSAGE);
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      const response = await axiosInstance.post("/auth/logout");
      set({ user: null, token: null });
      toast.success(response.data.message);
    } catch (error) {
      if (axiosError(error)) {
        toast.error(error.response?.data?.message || DEFAULT_MESSAGE);
      }
    } finally {
      set({ isLoggingOut: false });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/me");
      set({ user: response.data.user, token: response.data.token });
    } catch (error) {
      if (axiosError(error)) {
        console.log(error.response);
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  validateProps: (fullname, username, password, gender) => {
    if (
      !get().validFullName(fullname) ||
      !get().validUsername(username) ||
      !get().validPassword(password) ||
      !get().validGender(gender)
    ) {
      return false;
    }
    return true;
  },

  validFullName: (fullname) => {
    const parserFullName = String(fullname);

    if (parserFullName.length < 6) {
      toast.error("Full name must be at least 6 characters.");
      return false;
    }
    if (parserFullName.length > 255) {
      toast.error("Full name cannot exceed 255 characters.");
      return false;
    }
    return true;
  },

  validUsername: (username) => {
    const parsedUsername = String(username);
    const regex = /^[a-zA-Z0-9_]+$/;

    if (parsedUsername.length < 3) {
      toast.error("Username must be at least 3 characters.");
      return false;
    }
    if (parsedUsername.length > 50) {
      toast.error("Username cannot exceed 50 characters.");
      return false;
    }
    if (!regex.test(parsedUsername)) {
      toast.error(
        "Username can only contain letters, numbers, and underscores."
      );
      return false;
    }
    return true;
  },

  validPassword: (password) => {
    const parsedPassword = String(password);
    const regex1 = /[A-Z]/;
    const regex2 = /[a-z]/;
    const regex3 = /[0-9]/;
    if (parsedPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return false;
    }
    if (parsedPassword.length > 20) {
      toast.error("Password cannot exceed 20 characters.");
      return false;
    }
    if (!regex1.test(parsedPassword)) {
      toast.error("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!regex2.test(parsedPassword)) {
      toast.error("Password must contain at least one lowercase letter.");
      return false;
    }
    if (!regex3.test(parsedPassword)) {
      toast.error("Password must contain at least one number.");
      return false;
    }
    return true;
  },

  validGender: (gender) => {
    const parsedGender = String(gender);
    const validGenders = ["male", "female"];
    if (!validGenders.includes(parsedGender)) {
      return false;
    }
    return true;
  },
}));
