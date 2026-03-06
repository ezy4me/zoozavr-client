import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Layers } from "lucide-react";
import { useCourseStore } from "@/shared/store/useCourseStore";

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { currentCategory, fetchCategoryDetail, isLoading } = useCourseStore();

  useEffect(() => {
    if (id) {
      fetchCategoryDetail(id);
    }
  }, [id, fetchCategoryDetail]);

  if (isLoading) {
    return (
      <div className="p-10 text-center font-black animate-pulse text-slate-400 uppercase tracking-tighter">
        Загрузка разделов...
      </div>
    );
  }

  if (!currentCategory) {
    return (
      <div className="p-10 text-center font-bold text-slate-500">
        Категория не найдена
      </div>
    );
  }

  return (
    <div className="p-6 min-h-full bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
          <ChevronLeft className="text-slate-900" />
        </button>
        <h1 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">
          {currentCategory.name}
        </h1>
      </div>

      {/* Subcategories List */}
      <div className="grid gap-3">
        {currentCategory.subcategories?.length ? (
          currentCategory.subcategories.map((sub: any) => (
            <Link
              key={sub.id}
              to={`/subcategory/${sub.id}`}
              className="p-5 bg-white rounded-[28px] border border-slate-100 flex items-center justify-between active:scale-95 shadow-sm hover:shadow-md hover:border-slate-200 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                  <Layers size={24} />
                </div>
                <div>
                  <span className="font-black text-slate-900 uppercase tracking-tight block">
                    {sub.name}
                  </span>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                    Подраздел
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-slate-100 px-3 py-1.5 rounded-full font-black text-slate-500 uppercase tracking-tighter">
                  {sub._count?.courses || 0} курсов
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-3xl">
            <p className="text-slate-400 font-bold italic">
              В этой категории пока пусто
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
