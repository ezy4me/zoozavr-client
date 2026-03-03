import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  FileText,
  PlayCircle,
  Lock,
  CheckCircle,
} from "lucide-react";

export default function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // В будущем это будет запрос: api.get(`/courses/${id}/materials`)
  const materials = [
    { id: 1, name: "История бренда Zoozavr", type: "text", is_completed: true },
    {
      id: 2,
      name: "Стандарты обслуживания",
      type: "video",
      is_completed: false,
    },
    { id: 3, name: "Итоговый тест", type: "test", is_completed: false },
  ];

  return (
    <div className="flex flex-col min-h-full">
      {/* Шапка курса */}
      <div className="p-4 flex items-center gap-4 bg-white border-b sticky top-0 z-20">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft />
        </button>
        <h1 className="font-bold truncate text-lg">Введение в Зоозавр</h1>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Программа обучения
          </p>

          {materials.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.is_completed ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"}`}>
                {item.is_completed ? (
                  <CheckCircle size={20} />
                ) : item.type === "test" ? (
                  <Lock size={20} />
                ) : (
                  <PlayCircle size={20} />
                )}
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase">
                  Урок {index + 1}
                </p>
                <p className="font-bold text-slate-900 text-sm">{item.name}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full py-4 bg-green-600 text-white rounded-2xl font-black shadow-lg shadow-green-100 active:scale-[0.98] transition-transform">
          ПРОДОЛЖИТЬ ОБУЧЕНИЕ
        </button>
      </div>
    </div>
  );
}
