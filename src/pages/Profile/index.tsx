import { useNavigate } from "react-router-dom";
import {
  Settings,
  LogOut,
  Award,
  BookOpen,
  Zap,
  ChevronRight,
} from "lucide-react";
import { useUserStore } from "@/shared/store/useUserStore";

export default function ProfilePage() {
  const navigate = useNavigate();
  // Подключаем данные из нашего хранилища
  const { xp, completedCourses } = useUserStore();

  const userStats = [
    {
      label: "Курсы",
      value: completedCourses.length.toString(),
      icon: <BookOpen size={16} />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Опыт XP",
      value: xp.toLocaleString(),
      icon: <Zap size={16} />,
      color: "bg-orange-50 text-orange-600",
    },
    {
      label: "Награды",
      value: "4",
      icon: <Award size={16} />,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">
            Профиль
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            ID сотрудника: #0442
          </p>
        </div>
        <button
          onClick={() => navigate("/settings")}
          className="p-3 bg-slate-100 rounded-2xl text-slate-600 active:scale-95 transition-all hover:bg-slate-200">
          <Settings size={22} />
        </button>
      </div>

      <div className="p-6 rounded-[32px] bg-slate-900 text-white flex items-center gap-6 relative overflow-hidden shadow-xl shadow-slate-200">
        <div className="w-20 h-20 bg-white/10 rounded-[24px] flex items-center justify-center text-4xl border border-white/20 backdrop-blur-sm relative z-10">
          🐶
        </div>
        <div className="relative z-10">
          <h2 className="text-xl font-bold">Иван Иванов</h2>
          <p className="text-green-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
            Продавец-консультант
          </p>
        </div>
        <div className="absolute -right-4 -bottom-6 text-7xl opacity-10 rotate-12 italic font-black select-none uppercase">
          Зоозавр
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {userStats.map((s, i) => (
          <div
            key={i}
            className="p-4 rounded-[28px] bg-white border border-slate-100 flex flex-col items-center text-center gap-2 shadow-sm">
            <div className={`p-2 rounded-xl ${s.color}`}>{s.icon}</div>
            <div>
              <p className="text-lg font-black text-slate-900 leading-none">
                {s.value}
              </p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-tighter">
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
          Личные достижения
        </h3>

        <button className="w-full flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[28px] active:bg-slate-50 transition-all shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center">
              <Award size={20} />
            </div>
            <span className="font-bold text-slate-900 text-sm">
              Мои сертификаты
            </span>
          </div>
          <ChevronRight size={18} className="text-slate-300" />
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-5 text-red-500 bg-red-50/30 border border-red-50 rounded-[28px] active:bg-red-50 transition-all">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <LogOut size={20} />
          </div>
          <span className="font-bold text-sm">Выйти из системы</span>
        </button>
      </div>

      <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest">
        Обучение Зоозавр v1.0.2
      </p>
    </div>
  );
}