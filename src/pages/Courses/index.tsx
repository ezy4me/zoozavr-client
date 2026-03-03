import { Link } from "react-router-dom";
import { ChevronRight, Folder } from "lucide-react";

export default function CoursesPage() {
  const categories = [
    { id: 1, name: "Корпоративная культура", count: 12 },
    { id: 2, name: "Продажи и сервис", count: 8 },
    { id: 3, name: "Товарная экспертиза", count: 24 },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-black text-slate-900">Библиотека знаний</h1>
      <div className="grid gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-[28px] shadow-sm active:bg-slate-50 transition-all">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
              <Folder size={24} fill="currentColor" className="opacity-20" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900">{cat.name}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase">
                {cat.count} материалов
              </p>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </Link>
        ))}
      </div>
    </div>
  );
}
