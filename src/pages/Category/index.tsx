import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Layers } from "lucide-react";

export default function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const subcategories = [
    { id: 101, name: "Основы бренда", count: 4 },
    { id: 102, name: "Стандарты внешнего вида", count: 2 },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft />
        </button>
        <h1 className="text-xl font-bold italic uppercase tracking-tighter">
          Подкатегории
        </h1>
      </div>

      <div className="grid gap-3">
        {subcategories.map((sub) => (
          <Link
            key={sub.id}
            to={`/subcategory/${sub.id}`}
            className="p-5 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between active:scale-95 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-green-600">
                <Layers size={20} />
              </div>
              <span className="font-bold text-slate-900">{sub.name}</span>
            </div>
            <span className="text-[10px] bg-slate-200 px-2 py-1 rounded-full font-black">
              {sub.count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
