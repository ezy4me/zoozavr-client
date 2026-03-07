import { create } from "zustand";
import api from "../api";

// Типизируем объект курса в профиле
interface IActiveCourse {
  id: number;
  name: string;
  progress: number;
  isTestPassed: boolean;
  last_lesson: string;
}

interface UserState {
  name: string;
  xp: number;
  completedCourses: number[];
  activeCourses: IActiveCourse[]; 
  isAuth: boolean;
  login: (login: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<any>;
}

export const useUserStore = create<UserState>((set) => ({
  name: "Гость",
  xp: 0,
  completedCourses: [],
  activeCourses: [],
  isAuth: !!localStorage.getItem("token"),

  login: async (login, password) => {
    try {
      const response = await api.post("/auth/login", { login, password });
      const { accessToken } = response.data;
      localStorage.setItem("token", accessToken);
      // После входа флаг авторизации ставим в true
      set({ isAuth: true });
    } catch (e) {
      console.error("Ошибка входа", e);
      throw e;
    }
  },

  logout: async () => {
    localStorage.removeItem("token");
    set({
      name: "Гость",
      xp: 0,
      completedCourses: [],
      activeCourses: [],
      isAuth: false,
    });
  },

  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const response = await api.get("/users/profile");
      const data = response.data;

      set({
        name: data.fullName,
        xp: data.xp || 0,
        isAuth: true,
        completedCourses: data.completedCourses || [],
        activeCourses: data.activeCourses || [],
      });
      return data;
    } catch (e) {
      localStorage.removeItem("token");
      set({ isAuth: false, name: "Гость" });
      return null;
    }
  },
}));