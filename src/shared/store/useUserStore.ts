import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  name: string;
  role: string;
  xp: number;
  completedCourses: number[]; 
  
  addXP: (amount: number) => void;
  completeCourse: (courseId: number) => void;
  resetProgress: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: "Иван Иванов",
      role: "Продавец-консультант",
      xp: 0,
      completedCourses: [],

      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),

      completeCourse: (courseId) => set((state) => {
        if (state.completedCourses.includes(courseId)) return state;
        return { completedCourses: [...state.completedCourses, courseId] };
      }),

      resetProgress: () => set({ xp: 0, completedCourses: [] }),
    }),
    {
      name: 'zoozavr-user-storage', 
    }
  )
);