import { create } from "zustand";
import api from "../api";

interface Material {
  id: number;
  name: string;
  type: "text" | "video";
  isCompleted: boolean;
  content?: string;
}

interface Course {
  id: number;
  name: string;
  testId: number;
  materials: Material[];
}

interface CourseState {
  categories: any[];
  currentCourse: Course | null;
  isLoading: boolean;
  
  // Методы
  fetchCategories: () => Promise<void>;
  fetchCourseDetail: (id: string | number) => Promise<void>;
  completeMaterial: (materialId: number) => Promise<void>;
  submitTest: (testId: number, answers: any) => Promise<{ success: boolean; score: number }>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  categories: [],
  currentCourse: null,
  isLoading: false,

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/categories");
      set({ categories: response.data });
    } catch (e) {
      console.error("Ошибка загрузки категорий", e);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCourseDetail: async (id) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/courses/${id}`);
      set({ currentCourse: response.data });
    } catch (e) {
      console.error("Ошибка загрузки курса", e);
    } finally {
      set({ isLoading: false });
    }
  },

  completeMaterial: async (materialId) => {
    try {
      await api.post(`/materials/${materialId}/complete`);
      
      // Оптимистичное обновление: меняем статус в сторе не дожидаясь рефетча
      const current = get().currentCourse;
      if (current) {
        const updatedMaterials = current.materials.map(m => 
          m.id === materialId ? { ...m, isCompleted: true } : m
        );
        set({ currentCourse: { ...current, materials: updatedMaterials } });
      }
    } catch (e) {
      console.error("Не удалось завершить материал", e);
    }
  },

  submitTest: async (testId, answers) => {
    try {
      const response = await api.post(`/tests/${testId}/submit`, { answers });
      return response.data; // Возвращаем результат (баллы, прошел/не прошел)
    } catch (e) {
      console.error("Ошибка при отправке теста", e);
      throw e;
    }
  }
}));