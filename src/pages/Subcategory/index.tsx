import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, GraduationCap, Play, Clock } from "lucide-react";
import { useCourseStore } from "@/shared/store/useCourseStore";

export default function SubcategoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { currentSubcategory, fetchSubcategoryDetail, isLoading } = useCourseStore();

  useEffect(() => {
    if (id) {
      fetchSubcategoryDetail(id);
    }
  }, [id, fetchSubcategoryDetail]);

  if (isLoading) {
    return (
      <div className="p-10 text-center font-black animate-pulse text-slate-400 uppercase tracking-tighter">
        Подготовка курсов...
      </div>
    );
  }

  if (!currentSubcategory) {
    return (
      <div className="p-10 text-center font-bold text-slate-500">
        Подраздел не найден
      </div>
    );
  }

  return (
    <div className="p-6 min-h-full bg-white">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors"
        >
          <ChevronLeft className="text-slate-900" />
        </button>
        <h1 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">
          {currentSubcategory.name}
        </h1>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-4">
        {currentSubcategory.courses?.length ? (
          currentSubcategory.courses.map((course: any) => (
            <Link
              key={course.id}
              to={`/course/${course.id}`}
              className="group block p-1 bg-white border border-slate-100 rounded-[32px] shadow-sm active:scale-98 transition-all hover:border-green-300"
            >
              <div className="p-5 flex items-center gap-4">
                {/* Icon Container */}
                <div className="w-16 h-16 bg-green-700 rounded-[20px] flex items-center justify-center text-white shadow-lg shadow-green-100 group-hover:scale-105 transition-transform">
                  <GraduationCap size={32} />
                </div>

                {/* Info Section */}
                <div className="flex-1">
                  <h3 className="font-black text-slate-900 leading-tight mb-2 uppercase tracking-tighter text-lg">
                    {course.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
                      <Clock size={10} className="text-slate-400" />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        {course.materials?.length || 0} уроков
                      </span>
                    </div>
                    <div className="bg-orange-50 px-2 py-1 rounded-lg">
                      <span className="text-[9px] font-black text-orange-600 uppercase tracking-widest">
                        +{course.maxPoints || 0} XP
                      </span>
                    </div>
                  </div>
                </div>

                {/* Play Button Icon */}
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-green-600 group-hover:text-white transition-all">
                  <Play size={20} fill="currentColor" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="py-20 text-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-black italic uppercase tracking-tighter">
              Курсы скоро появятся
            </p>
          </div>
        )}
      </div>
    </div>
  );
}