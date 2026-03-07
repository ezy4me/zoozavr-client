import { create } from "zustand";
import api from "../api";
import { useUserStore } from "./useUserStore";
import type { ICourse, ITest, ICategory, ISubcategory } from "../types";

interface CourseState {
  categories: ICategory[];
  currentCategory: ICategory | null;
  currentSubcategory: ISubcategory | null;
  currentCourse: ICourse | null;
  currentTest: ITest | null;
  isLoading: boolean;
  fetchCategories: () => Promise<void>;
  fetchCategoryDetail: (id: string | number) => Promise<void>;
  fetchSubcategoryDetail: (id: string | number) => Promise<void>;
  fetchCourseDetail: (id: string | number) => Promise<void>;
  fetchTestDetail: (id: string | number) => Promise<void>;
  fetchMaterialContent: (path: string) => Promise<string>;
  completeMaterial: (materialId: number) => Promise<void>;
  submitTest: (
    testId: number,
    payload: { score: number; answers: any },
  ) => Promise<any>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  categories: [],
  currentCategory: null,
  currentSubcategory: null,
  currentCourse: null,
  currentTest: null,
  isLoading: false,

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get<ICategory[]>("/categories");
      set({ categories: data });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCategoryDetail: async (id) => {
    set({ isLoading: true, currentCategory: null });
    try {
      const { data } = await api.get<ICategory>(`/categories/${id}`);
      set({ currentCategory: data });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSubcategoryDetail: async (id) => {
    set({ isLoading: true, currentSubcategory: null });
    try {
      const { data } = await api.get<ISubcategory>(`/subcategories/${id}`);
      set({ currentSubcategory: data });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCourseDetail: async (id) => {
    set({ isLoading: true });
    try {
      const { data } = await api.get<ICourse>(`/courses/${id}`);
      set({ currentCourse: data });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTestDetail: async (id) => {
    set({ isLoading: true, currentTest: null });
    try {
      const { data } = await api.get<ITest>(`/tests/${id}`);
      set({ currentTest: data });
    } finally {
      set({ isLoading: false });
    }
  },

  completeMaterial: async (materialId: number) => {
    try {
      // 1. Фиксируем прохождение на бэкенде
      await api.post(`/materials/${materialId}/complete`);

      // 2. Локально обновляем статус в текущем курсе для мгновенной реакции UI
      const current = get().currentCourse;
      if (current) {
        const updatedMaterials = current.materials.map((m) =>
          Number(m.id) === Number(materialId) ? { ...m, isCompleted: true } : m,
        );
        set({ currentCourse: { ...current, materials: updatedMaterials } });
      }

      // 3. СИНХРОНИЗАЦИЯ: обновляем XP, уровень и список пройденного в сторе юзера
      await useUserStore.getState().checkAuth();
    } catch (e) {
      console.error("Ошибка при завершении материала:", e);
    }
  },

  submitTest: async (testId, payload) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post(`/tests/${testId}/submit`, payload);
      // Обновляем профиль после теста, так как могли измениться XP/курсы
      await useUserStore.getState().checkAuth();
      return data;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMaterialContent: async (path: string) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const cleanBase = baseUrl.replace(/\/$/, "");
      const cleanPath = path.replace(/^\//, "");
      const fullUrl = `${cleanBase}/${cleanPath}`;

      const response = await fetch(fullUrl);
      if (!response.ok) throw new Error("Файл не найден");
      return await response.text();
    } catch (e) {
      console.error(e);
      return "Ошибка загрузки контента урока.";
    }
  },
}));
