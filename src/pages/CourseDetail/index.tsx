import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, PlayCircle, CheckCircle, Lock } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useCourseStore } from "@/shared/store/useCourseStore";
import type { IMaterial } from "@/shared/types";

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentCourse, fetchCourseDetail, isLoading } = useCourseStore();

  useEffect(() => {
    if (id) fetchCourseDetail(id);
  }, [id, fetchCourseDetail]);

  if (isLoading || !currentCourse) {
    return <div className="p-10 text-center font-black animate-pulse uppercase italic text-slate-400">Загрузка курса...</div>;
  }

  const allCompleted = currentCourse.materials.every((m: IMaterial) => m.isCompleted);

  return (
    <div className="flex flex-col min-h-full bg-white">
      <div className="p-4 flex items-center gap-4 border-b sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-black truncate text-lg uppercase tracking-tighter italic">
          {currentCourse.name}
        </h1>
      </div>

      <div className="p-6 space-y-8 flex-1">
        <div className="grid gap-3">
          {currentCourse.materials.map((item: IMaterial, index: number) => (
            <button
              key={item.id}
              onClick={() => navigate(`/material/${item.id}`)}
              className={`w-full flex items-center gap-4 p-4 rounded-[24px] border transition-all text-left ${
                item.isCompleted 
                  ? "bg-slate-50 border-transparent opacity-80" 
                  : "bg-white border-slate-100 shadow-sm hover:border-slate-300"
              }`}
            >
              <div className={item.isCompleted ? "text-green-500" : "text-slate-300"}>
                {item.isCompleted ? <CheckCircle size={24} /> : <PlayCircle size={24} />}
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Урок {index + 1}</p>
                <p className="font-bold text-slate-900 leading-tight">{item.name}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Секция с тестом */}
        <div className={`p-6 rounded-[32px] border-2 border-dashed transition-colors ${
          allCompleted ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-100'
        }`}>
          <Button
            disabled={!allCompleted}
            onClick={() => navigate(`/test/${currentCourse.testId}`)}
            className={`w-full h-16 rounded-2xl font-black text-lg transition-all shadow-lg ${
              allCompleted 
                ? "bg-slate-900 text-white shadow-slate-200" 
                : "bg-slate-200 text-slate-400 shadow-none cursor-not-allowed"
            }`}
          >
            {allCompleted ? "НАЧАТЬ ТЕСТ" : (
              <div className="flex items-center justify-center gap-2">
                <Lock size={18} />
                <span>ЗАБЛОКИРОВАНО</span>
              </div>
            )}
          </Button>
          {!allCompleted && (
            <p className="text-center text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-tighter">
              Пройдите все уроки, чтобы открыть тест
            </p>
          )}
        </div>
      </div>
    </div>
  );
}