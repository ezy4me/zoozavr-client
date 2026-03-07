import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  PlayCircle,
  CheckCircle,
  Lock,
  Trophy,
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useCourseStore } from "@/shared/store/useCourseStore";
import { useUserStore } from "@/shared/store/useUserStore";

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { currentCourse, fetchCourseDetail, isLoading } = useCourseStore();
  const { completedCourses, activeCourses } = useUserStore();

  useEffect(() => {
    if (id) fetchCourseDetail(id);
  }, [id, fetchCourseDetail]);

  const isTestPassed = useMemo(() => {
    if (!id) return false;

    const courseIdNum = Number(id);

    // 1. Проверка по завершенным
    const inCompleted = completedCourses.some(
      (cId) => Number(cId) === courseIdNum,
    );

    // 2. Проверка по активным
    const activeData = activeCourses.find((c) => Number(c.id) === courseIdNum);
    const inActivePassed = activeData?.isTestPassed === true;

    // 3. Проверка по результатам
    const hasResults = currentCourse?.tests?.[0]?.results?.some(
      (r: any) => r.score >= (currentCourse.tests?.[0].passingScore ?? 80),
    );

    return inCompleted || inActivePassed || !!hasResults;
  }, [id, completedCourses, activeCourses, currentCourse]);

  if (isLoading || !currentCourse)
    return (
      <div className="p-10 text-center font-black animate-pulse text-slate-400 uppercase tracking-widest">
        Загрузка курса...
      </div>
    );

  const allMaterialsCompleted =
    currentCourse.materials.length > 0 &&
    currentCourse.materials.every((m) => m.isCompleted);

  const test = currentCourse.tests?.[0];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="p-4 flex items-center gap-4 border-b sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-black truncate text-lg uppercase italic tracking-tighter text-slate-900">
          {currentCourse.name}
        </h1>
      </div>

      <div className="p-6 space-y-8 flex-1">
        {/* Список материалов */}
        <div className="grid gap-3">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">
            Программа обучения
          </h2>
          {currentCourse.materials.map((item, index) => (
            <button
              key={item.id}
              onClick={() => navigate(`/material/${item.id}`)}
              className={`w-full flex items-center gap-4 p-4 rounded-[24px] border transition-all text-left ${
                item.isCompleted
                  ? "bg-slate-100 border-transparent opacity-60"
                  : "bg-white border-slate-100 shadow-sm hover:border-slate-300"
              }`}>
              <div
                className={
                  item.isCompleted ? "text-green-500" : "text-slate-300"
                }>
                {item.isCompleted ? (
                  <CheckCircle
                    size={24}
                    className="animate-in zoom-in duration-300"
                  />
                ) : (
                  <PlayCircle size={24} />
                )}
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-black text-slate-400 uppercase">
                  Урок {index + 1}
                </p>
                <p className="font-bold text-slate-900 leading-tight">
                  {item.name}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Секция теста */}
        <div
          className={`p-6 rounded-[32px] border-2 border-dashed transition-all duration-700 ${
            isTestPassed
              ? "bg-gradient-to-b from-orange-50 to-white border-orange-200 shadow-inner"
              : allMaterialsCompleted
                ? "bg-green-50 border-green-200"
                : "bg-slate-50 border-slate-100"
          }`}>
          <div className="mb-4 text-center">
            <h3 className="text-sm font-black uppercase italic text-slate-900">
              Итоговый экзамен
            </h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">
              {isTestPassed
                ? "Курс завершен успешно!"
                : allMaterialsCompleted
                  ? "Все уроки пройдены! Пора закрепить результат"
                  : "Доступен после изучения всех уроков"}
            </p>
          </div>

          <Button
            disabled={!allMaterialsCompleted || isTestPassed}
            onClick={() => test?.id && navigate(`/test/${test.id}`)}
            className={`w-full h-16 rounded-2xl font-black text-lg shadow-xl transition-all duration-500 active:scale-95 ${
              isTestPassed
                ? "bg-orange-500 text-white shadow-orange-200 opacity-100 cursor-default ring-4 ring-orange-500/20"
                : allMaterialsCompleted
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-slate-200 text-slate-400 shadow-none"
            }`}>
            {isTestPassed ? (
              <div className="flex items-center gap-2 animate-in slide-in-from-bottom-2">
                <Trophy
                  size={22}
                  fill="currentColor"
                  className="text-yellow-200 animate-bounce"
                />
                <span className="tracking-tight">ТЕСТ ПОДТВЕРЖДЕН</span>
              </div>
            ) : allMaterialsCompleted ? (
              "НАЧАТЬ ТЕСТ"
            ) : (
              <div className="flex items-center gap-2 opacity-50">
                <Lock size={18} /> ЗАБЛОКИРОВАНО
              </div>
            )}
          </Button>

          
        </div>
      </div>
    </div>
  );
}
