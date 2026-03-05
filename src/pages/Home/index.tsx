import { Link } from "react-router-dom";
import { CheckCircle2, Clock, Trophy } from "lucide-react";

export default function HomePage() {
  const activeCourses = [
    {
      id: 1,
      name: "Введение в Зоозавр",
      progress: 33,
      last_lesson: "История бренда",
    },
    {
      id: 3,
      name: "Техники продаж 5 шагов",
      progress: 10,
      last_lesson: "Установление контакта",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <header>
        <h1 className="text-3xl font-black text-slate-900">Моё обучение</h1>
        <p className="text-slate-500 text-sm font-medium">
          Продолжи с того места, где остановился
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Clock size={14} /> Активные курсы ({activeCourses.length})
        </h2>

        {activeCourses.map((course) => (
          <Link
            key={course.id}
            to={`/course/${course.id}`}
            className="block p-5 rounded-[32px] bg-white border border-slate-100 shadow-sm active:scale-[0.98] transition-all">
            <h3 className="font-bold text-slate-900 mb-1">{course.name}</h3>
            <p className="text-[10px] text-slate-400 uppercase font-bold mb-4">
              Урок: {course.last_lesson}
            </p>

            <div className="flex items-center gap-4">
              <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600 transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <span className="text-sm font-black text-green-700">
                {course.progress}%
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section className="p-6 rounded-[32px] bg-slate-900 text-white relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-green-400 text-[10px] font-bold uppercase tracking-widest mb-2">
            Твои успехи
          </p>
          <h3 className="text-xl font-bold mb-4">Ты в ТОП-15 команды!</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-yellow-400" />
              <span className="text-sm font-bold">1,240 XP</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-400" />
              <span className="text-sm font-bold">4 курса</span>
            </div>
          </div>
        </div>
        <div className="absolute -right-6 -bottom-6 text-8xl opacity-10">
          🦖
        </div>
      </section>
    </div>
  );
}
