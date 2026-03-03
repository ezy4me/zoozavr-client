import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, GraduationCap, Play } from "lucide-react";

export default function SubcategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const courses = [
    { id: 1, name: "История и ценности", duration: "20 мин", points: 100 },
    { id: 2, name: "Кодекс зоозавра", duration: "40 мин", points: 200 },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft />
        </button>
        <h1 className="text-xl font-bold italic uppercase tracking-tighter">
          Выберите курс
        </h1>
      </div>

      <div className="grid gap-4">
        {courses.map((course) => (
          <Link
            key={course.id}
            to={`/course/${course.id}`}
            className="block p-1 bg-white border border-slate-100 rounded-[32px] shadow-sm active:scale-98 transition-all">
            <div className="p-5 flex items-center gap-4">
              <div className="w-14 h-14 bg-green-700 rounded-2xl flex items-center justify-center text-white">
                <GraduationCap size={28} />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-slate-900 leading-tight mb-1">
                  {course.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {course.duration}
                  </span>
                  <span className="text-[10px] font-bold text-orange-500 uppercase">
                    +{course.points} XP
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <Play size={16} fill="currentColor" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
