import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, PlayCircle, CheckCircle, GraduationCap, Lock } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useCourseStore } from "@/shared/store/useCourseStore";

export default function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Берем всё необходимое из курса
  const { currentCourse, fetchCourseDetail, isLoading } = useCourseStore();

  useEffect(() => {
    if (id) fetchCourseDetail(id);
  }, [id]);

  if (isLoading || !currentCourse) {
    return <div className="p-10 text-center font-black animate-pulse">ЗАГРУЗКА...</div>;
  }

  const allCompleted = currentCourse.materials.every(m => m.isCompleted);

  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Шапка и контент остаются такими же, но данные теперь из currentCourse */}
      <div className="p-4 flex items-center gap-4 border-b sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <button onClick={() => navigate(-1)} className="p-1"><ChevronLeft size={24} /></button>
        <h1 className="font-black truncate text-lg uppercase tracking-tighter">
          {currentCourse.name}
        </h1>
      </div>

      <div className="p-6 space-y-8 flex-1">
        <div className="grid gap-3">
          {currentCourse.materials.map((item, index) => (
            <button
              key={item.id}
              onClick={() => navigate(`/material/${item.id}`)}
              className={`w-full flex items-center gap-4 p-4 rounded-3xl border transition-all text-left ${
                item.isCompleted ? "bg-slate-50 opacity-70" : "bg-white shadow-sm"
              }`}
            >
              <div className={item.isCompleted ? "text-green-600" : "text-slate-400"}>
                {item.isCompleted ? <CheckCircle /> : <PlayCircle />}
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Урок {index + 1}</p>
                <p className="font-bold text-slate-900">{item.name}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Секция с тестом */}
        <div className={`p-6 rounded-[32px] border-2 border-dashed ${allCompleted ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-100'}`}>
           <Button
            disabled={!allCompleted}
            onClick={() => navigate(`/test/${currentCourse.testId}`)}
            className="w-full h-14 rounded-2xl font-black bg-slate-900 text-white disabled:bg-slate-200"
          >
            {allCompleted ? "НАЧАТЬ ТЕСТ" : <Lock className="mx-auto" />}
          </Button>
        </div>
      </div>
    </div>
  );
}