import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Folder } from "lucide-react";
import { useCourseStore } from "@/shared/store/useCourseStore";
import type { ICategory } from "@/shared/types";

export default function CoursesPage() {
  const { categories, fetchCategories, isLoading } = useCourseStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="p-6 space-y-6 bg-white min-h-full">
      <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">
        Библиотека
      </h1>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-center py-10 font-black text-slate-300 animate-pulse uppercase italic">
            Загрузка категорий...
          </div>
        ) : (
          categories.map((cat: ICategory) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-[28px] shadow-sm active:scale-[0.97] transition-all hover:border-green-200">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                <Folder size={24} fill="currentColor" className="opacity-20" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-slate-900 leading-tight uppercase tracking-tight">
                  {cat.name}
                </h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">
                  {cat._count?.subcategories || 0} подразделов
                </p>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
