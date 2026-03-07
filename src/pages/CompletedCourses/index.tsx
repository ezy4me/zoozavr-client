import { useNavigate } from "react-router-dom";
import { ChevronLeft, Award, CheckCircle, ArrowRight } from "lucide-react";
import { useUserStore } from "@/shared/store/useUserStore";

export default function CompletedCoursesPage() {
  const navigate = useNavigate();
  const { activeCourses } = useUserStore();

  const completed = activeCourses.filter(course => course.isTestPassed);

  return (
    <div className="p-6 min-h-screen bg-white space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-black uppercase italic tracking-tighter text-slate-900">
          Мои достижения
        </h1>
      </div>

      {completed.length > 0 ? (
        <div className="grid gap-4">
          {completed.map((course) => (
            <div 
              key={course.id}
              onClick={() => navigate(`/course/${course.id}`)}
              className="group p-5 bg-gradient-to-br from-green-50/50 to-white border border-green-100 rounded-[32px] flex items-center gap-4 active:scale-95 transition-all cursor-pointer shadow-sm shadow-green-50"
            >
              <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-100">
                <Award size={28} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle size={12} className="text-green-600" />
                  <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">
                    Пройдено
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 leading-tight">
                  {course.name}
                </h3>
              </div>

              <div className="w-10 h-10 rounded-full bg-white border border-green-100 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <ArrowRight size={18} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
          <div className="mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-200 shadow-sm">
            <Award size={32} />
          </div>
          <p className="text-slate-400 font-black italic uppercase tracking-tighter px-10 leading-relaxed">
            У вас пока нет завершенных курсов. Пора это исправить!
          </p>
        </div>
      )}
    </div>
  );
}