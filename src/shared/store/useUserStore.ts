import { create } from "zustand";
import api from "../api";

interface UserState {
  name: string;
  xp: number;
  completedCourses: number[];
  isAuth: boolean;
  login: (login: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  name: "Гость",
  xp: 0,
  completedCourses: [],
  isAuth: !!localStorage.getItem("token"),

  login: async (login, password) => {
    try {
      const response = await api.post("/auth/login", { login, password });
      const { accessToken, user } = response.data;

      localStorage.setItem("token", accessToken);
      set({
        name: user.fullName,
        xp: user.xp || 0,
        isAuth: true,
        completedCourses: user.completedCourses || [],
      });
    } catch (e) {
      console.error("Ошибка входа", e);
      throw e;
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      console.error("Ошибка при выходе", e);
    } finally {
      localStorage.removeItem("token");
      set({
        name: "Гость",
        xp: 0,
        completedCourses: [],
        isAuth: false,
      });
    }
  },

  checkAuth: async () => {
    if (!localStorage.getItem("token")) return;

    try {
      const response = await api.get("/auth/me");
      const user = response.data;

      set({
        name: user.fullName,
        xp: user.xp || 0,
        isAuth: true,
        completedCourses: user.completedCourses || [],
      });
    } catch (e) {
      localStorage.removeItem("token");
      set({ isAuth: false });
    }
  },
}));
