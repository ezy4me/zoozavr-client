import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  PlayCircle,
  Lock,
  CheckCircle,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/shared/ui/button";

export default function CourseDetailPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const courseInfo = {
    id: id,
    title: "Введение в Зоозавр",
    testId: 101, 
    materials: [
      {
        id: 1,
        name: "История бренда и миссия",
        type: "text",
        is_completed: true,
      },
      {
        id: 2,
        name: "Стандарты обслуживания",
        type: "video",
        is_completed: true,
      },
      { id: 3, name: "Корпоративная этика", type: "text", is_completed: true },
    ],
  };

  const allCompleted = courseInfo.materials.every((m) => m.is_completed);

  return (
    <div className="flex flex-col min-h-full bg-white">
      <div className="p-4 flex items-center gap-4 border-b sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-black truncate text-lg uppercase tracking-tighter">
          {courseInfo.title}
        </h1>
      </div>

      <div className="p-6 space-y-8 flex-1">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Программа курса
            </h2>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
              {courseInfo.materials.filter((m) => m.is_completed).length} /{" "}
              {courseInfo.materials.length} пройден
            </span>
          </div>

          <div className="grid gap-3">
            {courseInfo.materials.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center gap-4 p-4 rounded-3xl border transition-all ${
                  item.is_completed
                    ? "bg-slate-50 border-slate-100 opacity-70"
                    : "bg-white border-slate-200 shadow-sm"
                }`}>
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    item.is_completed
                      ? "bg-green-100 text-green-600"
                      : "bg-slate-100 text-slate-400"
                  }`}>
                  {item.is_completed ? (
                    <CheckCircle size={20} />
                  ) : (
                    <PlayCircle size={20} />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                    Урок {index + 1}
                  </p>
                  <p className="font-bold text-slate-900 text-sm">
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`p-6 rounded-[32px] border-2 border-dashed flex flex-col items-center text-center space-y-4 ${
            allCompleted
              ? "border-green-200 bg-green-50"
              : "border-slate-100 bg-slate-50/50"
          }`}>
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${
              allCompleted
                ? "bg-green-600 text-white"
                : "bg-slate-200 text-slate-400"
            }`}>
            <GraduationCap size={28} />
          </div>

          <div>
            <h3 className="font-black text-slate-900">Финальная проверка</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-[200px] mx-auto">
              {allCompleted
                ? "Все уроки пройдены! Пора закрепить знания и получить баллы."
                : "Изучите все материалы курса, чтобы открыть доступ к тесту."}
            </p>
          </div>

          <Button
            disabled={!allCompleted}
            onClick={() => navigate(`/test/${courseInfo.testId}`)}
            className={`w-full h-14 rounded-2xl font-black transition-all ${
              allCompleted
                ? "bg-slate-900 text-white shadow-xl shadow-slate-200 active:scale-95"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}>
            {allCompleted ? (
              "НАЧАТЬ ТЕСТ"
            ) : (
              <Lock size={20} className="mx-auto" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
