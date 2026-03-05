import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, Clock, Trophy, Zap, ChevronRight } from "lucide-react";
import { useUserStore } from "@/shared/store/useUserStore";
import { CourseCardSkeleton, Skeleton } from "@/shared/ui/Skeleton";
import api from "@/shared/api/"; 

interface Course {
  id: number;
  name: string;
  progress?: number;
  last_lesson?: string;
}

export default function HomePage() {
  const { xp, completedCourses, name } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeCourses, setActiveCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/courses");
        
        const coursesData = response.data.map((c: any) => ({
          id: c.id,
          name: c.name,
          progress: c.userProgress?.[0]?.points || (completedCourses.includes(c.id) ? 100 : 0),
          last_lesson: c.materials?.[0]?.name || "Начать обучение",
        }));

        setActiveCourses(coursesData);
      } catch (error) {
        console.error("Ошибка при загрузке курсов:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, [completedCourses]);

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
                Привет, {name?.split(' ')[0] || 'Коллега'}!
              </h1>
              <p className="text-slate-500 text-sm font-medium">
                Продолжи обучение в Зоозавре
              </p>
            </>
          )}
        </div>
      </header>

      {isLoading ? (
        <Skeleton className="h-40 w-full rounded-[32px]" />
      ) : (
        <section className="p-6 rounded-[32px] bg-slate-900 text-white relative overflow-hidden shadow-xl shadow-slate-200">
          <div className="relative z-10">
            <p className="text-green-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
              Твои успехи
            </p>
            <h3 className="text-xl font-bold mb-4 italic uppercase tracking-tight">Ты в ТОП-15 команды!</h3>
            
            <div className="flex gap-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-orange-400">
                  <Zap size={18} fill="currentColor" />
                  <span className="text-xl font-black">{xp.toLocaleString()}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Очков XP</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle2 size={18} />
                  <span className="text-xl font-black">{completedCourses.length}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Курсов</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Clock size={14} /> Активные курсы ({activeCourses.length})
          </h2>
          <Link to="/courses" className="text-green-700 text-[10px] font-black uppercase flex items-center gap-1">
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
                className="group block p-5 rounded-[32px] bg-white border border-slate-100 shadow-sm active:scale-[0.98] transition-all hover:border-slate-300"
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-900 group-hover:text-green-700 transition-colors">
                    {course.name}
                  </h3>
                  {course.progress === 100 && <CheckCircle2 size={18} className="text-green-500" />}
                </div>
                
                <p className="text-[10px] text-slate-400 uppercase font-bold mb-4">
                  Урок: {course.last_lesson}
                </p>

                <div className="flex items-center gap-4">
                  <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 transition-all duration-700"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-black text-slate-900">
                    {course.progress}%
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-10 text-center bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
               <p className="text-slate-400 font-bold text-sm uppercase">Нет активных курсов</p>
               <Link to="/courses" className="text-green-600 text-xs font-black uppercase mt-2 block">Выбрать обучение</Link>
            </div>
          )}
        </div>
      </section>

      {isLoading ? (
        <Skeleton className="h-20 w-full rounded-[28px]" />
      ) : (
        <button 
          onClick={() => navigate("/leaderboard")}
          className="w-full p-5 bg-orange-50 rounded-[28px] border border-orange-100 flex items-center justify-between group active:scale-95 transition-all shadow-sm shadow-orange-50"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white rounded-xl shadow-sm text-orange-500">
              <Trophy size={20} />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900">Таблица лидеров</p>
              <p className="text-[10px] text-orange-600 font-bold uppercase">Посмотри своё место</p>
            </div>
          </div>
          <ChevronRight className="text-orange-300 group-hover:translate-x-1 transition-transform" />
        </button>
      )}
    </div>
  );
}