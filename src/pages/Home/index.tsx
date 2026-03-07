import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  Trophy,
  Zap,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { useUserStore } from "@/shared/store/useUserStore";
import { CourseCardSkeleton, Skeleton } from "@/shared/ui/Skeleton";

export default function HomePage() {
  const { xp, completedCourses, name, activeCourses, checkAuth } =
    useUserStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      setIsLoading(true);
      await checkAuth();
      setIsLoading(false);
    };
    fetchHomeData();
  }, [checkAuth]);

  return (
    <div className="p-6 space-y-8">
      <header className="flex justify-between items-end">
        <div className="space-y-1">
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-40 mb-2" />
              <Skeleton className="h-4 w-56" />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">
                Привет, {name?.split(" ")[0] || "Коллега"}!
              </h1>
              <p className="text-slate-500 text-sm font-medium">
                Продолжи обучение в Зоозавре
              </p>
            </>
          )}
        </div>
      </header>

      {/* Секция успехов */}
      {isLoading ? (
        <Skeleton className="h-40 w-full rounded-[32px]" />
      ) : (
        <section className="p-6 rounded-[32px] bg-slate-900 text-white relative overflow-hidden shadow-xl shadow-slate-200">
          <div className="relative z-10">
            <p className="text-green-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
              Твои успехи
            </p>
            <div className="flex gap-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-orange-400">
                  <Zap size={18} fill="currentColor" />
                  <span className="text-xl font-black">
                    {xp.toLocaleString()}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">
                  Очков XP
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle2 size={18} />
                  <span className="text-xl font-black">
                    {completedCourses.length}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">
                  Курсов
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Список активных курсов */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Clock size={14} /> Активные курсы ({activeCourses.length})
          </h2>
          <Link
            to="/courses"
            className="text-green-700 text-[10px] font-black uppercase flex items-center gap-1">
            Все <ChevronRight size={12} />
          </Link>
        </div>

        <div className="space-y-3">
          {isLoading ? (
            <>
              <CourseCardSkeleton />
              <CourseCardSkeleton />
            </>
          ) : activeCourses.length > 0 ? (
            activeCourses.map((course) => (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className={`group block p-5 rounded-[32px] bg-white border transition-all active:scale-[0.98] shadow-sm hover:shadow-md ${
                  course.progress === 100 && !course.isTestPassed
                    ? "border-rose-200 bg-rose-50/30"
                    : "border-slate-100 hover:border-slate-300"
                }`}>
                <div className="flex justify-between items-start mb-1">
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 group-hover:text-green-700 transition-colors">
                      {course.name}
                    </h3>

                    {/* ЯРКИЙ ИНДИКАТОР СТАТУСА ТЕСТА */}
                    {course.isTestPassed ? (
                      <div className="flex items-center gap-1.5 py-0.5 px-2 bg-orange-100 w-fit rounded-full text-[9px] font-black text-orange-600 uppercase tracking-tighter">
                        <Trophy size={10} fill="currentColor" />
                        Тест сдан успешно
                      </div>
                    ) : course.progress === 100 ? (
                      <div className="flex items-center gap-1.5 py-0.5 px-2 bg-rose-100 w-fit rounded-full text-[9px] font-black text-rose-600 uppercase tracking-tighter animate-pulse">
                        <AlertCircle
                          size={10}
                          fill="currentColor"
                          className="text-white"
                        />
                        Требуется сдача теста!
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 py-0.5 px-2 bg-slate-100 w-fit rounded-full text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                        <Clock size={10} />
                        Тест не пройден
                      </div>
                    )}
                  </div>

                  {/* Главная иконка завершения */}
                  {course.progress === 100 && course.isTestPassed ? (
                    <CheckCircle2
                      size={22}
                      className="text-green-500 shrink-0"
                    />
                  ) : course.progress === 100 ? (
                    <Zap
                      size={22}
                      className="text-rose-500 shrink-0"
                      fill="currentColor"
                    />
                  ) : null}
                </div>

                <p className="text-[10px] text-slate-400 uppercase font-bold mb-4 mt-2">
                  Последний этап:{" "}
                  <span className="text-slate-600">{course.last_lesson}</span>
                </p>

                <div className="flex items-center gap-4">
                  <div className="h-2.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        course.isTestPassed
                          ? "bg-orange-400"
                          : course.progress === 100
                            ? "bg-rose-400"
                            : "bg-green-600"
                      }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <span
                    className={`text-xs font-black ${course.progress === 100 ? "text-slate-900" : "text-slate-400"}`}>
                    {course.progress}%
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-10 text-center bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-bold text-sm uppercase">
                Нет активных курсов
              </p>
              <Link
                to="/courses"
                className="text-green-600 text-xs font-black uppercase mt-2 block">
                Выбрать обучение
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Лидерборд */}
      {!isLoading && (
        <button
          onClick={() => navigate("/leaderboard")}
          className="w-full p-5 bg-orange-50 rounded-[28px] border border-orange-100 flex items-center justify-between group active:scale-95 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white rounded-xl shadow-sm text-orange-500">
              <Trophy size={20} />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900">
                Таблица лидеров
              </p>
              <p className="text-[10px] text-orange-600 font-bold uppercase">
                Посмотри своё место
              </p>
            </div>
          </div>
          <ChevronRight className="text-orange-300 group-hover:translate-x-1 transition-transform" />
        </button>
      )}
    </div>
  );
}
