import { create } from "zustand";
import api from "../api";
import type { ICourse, ITest, ICategory, ISubcategory } from "../types";

interface CourseState {
  categories: ICategory[];
  currentCategory: ICategory | null;
  currentSubcategory: ISubcategory | null;
  currentCourse: ICourse | null;
  currentTest: ITest | null;
  isLoading: boolean;

  // Методы загрузки
  fetchCategories: () => Promise<void>;
  fetchCategoryDetail: (id: string | number) => Promise<void>;
  fetchSubcategoryDetail: (id: string | number) => Promise<void>;
  fetchCourseDetail: (id: string | number) => Promise<void>;
  fetchTestDetail: (id: string | number) => Promise<void>;
  fetchMaterialContent: (path: string) => Promise<string>;

  // Методы действий
  completeMaterial: (materialId: number) => Promise<void>;
  submitTest: (
    testId: number,
    payload: { score: number; answers: any },
  ) => Promise<{
    message: string;
    result: { score: number };
  }>;
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

  // Получаем подкатегорию и её курсы
  fetchSubcategoryDetail: async (id) => {
    set({ isLoading: true, currentSubcategory: null });
    try {
      const { data } = await api.get<ISubcategory>(`/subcategories/${id}`);
      set({ currentSubcategory: data });
    } finally {
      set({ isLoading: false });
    }
  },

  // Детали курса (уроки)
  fetchCourseDetail: async (id) => {
    set({ isLoading: true, currentCourse: null });
    try {
      const { data } = await api.get<ICourse>(`/courses/${id}`);
      set({ currentCourse: data });
    } finally {
      set({ isLoading: false });
    }
  },

  // Детали теста
  fetchTestDetail: async (id) => {
    set({ isLoading: true, currentTest: null });
    try {
      const { data } = await api.get<ITest>(`/tests/${id}`);
      set({ currentTest: data });
    } finally {
      set({ isLoading: false });
    }
  },

  // Логика прохождения урока
  completeMaterial: async (materialId) => {
    try {
      await api.post(`/materials/${materialId}/complete`);
      const current = get().currentCourse;
      if (current) {
        const updated = current.materials.map((m) =>
          m.id === materialId ? { ...m, isCompleted: true } : m,
        );
        set({ currentCourse: { ...current, materials: updated } });
      }
    } catch (e) {
      console.error("Error completing material", e);
    }
  },

  // Отправка результатов теста
  submitTest: async (testId, payload) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post(`/tests/${testId}/submit`, payload);
      return data;
    } finally {
      set({ isLoading: false });
    }
  },

fetchMaterialContent: async (path: string) => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL;
    const fullPath = `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
    
    const response = await fetch(fullPath);
    if (!response.ok) throw new Error(`Файл не найден по адресу: ${fullPath}`);
    
    return await response.text();
  } catch (e) {
    console.error("Markdown Fetch Error:", e);
    return "Ошибка загрузки контента урока. Проверьте путь к файлу на сервере.";
  }
},
}));
