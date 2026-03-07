import { useNavigate } from "react-router-dom";
import {
  Settings,
  LogOut,
  BookOpen,
  Zap,
  ChevronRight,
  Medal,
} from "lucide-react";
import { useUserStore } from "@/shared/store/useUserStore";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { xp, completedCourses, name, logout } = useUserStore();

  // Логика уровней: каждые 1000 XP = +1 уровень
  const userLevel = Math.floor(xp / 1000) + 1;

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
      label: "Уровень",
      value: userLevel.toString(),
      icon: <Medal size={16} />,
      color: "bg-green-50 text-green-600",
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (e) {
      console.error("Ошибка при выходе:", e);
    }
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Заголовок */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">
            Профиль
          </h1>
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">
            {userLevel > 5 ? "⚡️ Эксперт Зоозавра" : "🦖 Сотрудник Зоозавра"}
          </p>
        </div>
        <button
          onClick={() => navigate("/settings")}
          className="p-3 bg-slate-100 rounded-2xl text-slate-600 active:scale-90 transition-all hover:bg-slate-200 shadow-sm">
          <Settings size={22} />
        </button>
      </div>

      {/* Карточка пользователя */}
      <div className="p-6 rounded-[32px] bg-slate-900 text-white flex items-center gap-6 relative overflow-hidden shadow-2xl shadow-slate-300">
        <div className="w-20 h-20 bg-white/10 rounded-[24px] flex items-center justify-center text-4xl border border-white/20 backdrop-blur-md relative z-10 shadow-inner">
          🦖
        </div>
        <div className="relative z-10">
          <h2 className="text-xl font-black truncate max-w-[180px] tracking-tight">
            {name || "Коллега"}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <p className="text-green-400 text-[9px] font-black uppercase tracking-[0.2em]">
              В сети
            </p>
          </div>
        </div>
        {/* Декоративная подложка */}
        <div className="absolute -right-6 -bottom-8 text-8xl opacity-[0.07] rotate-12 italic font-black select-none uppercase pointer-events-none">
          ZOO
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-3 gap-3">
        {userStats.map((s, i) => (
          <div
            key={i}
            className="p-4 rounded-[28px] bg-white border border-slate-100 flex flex-col items-center text-center gap-2 shadow-sm transition-all active:scale-95 hover:border-slate-200">
            <div className={`p-2 rounded-xl ${s.color} shadow-sm`}>
              {s.icon}
            </div>
            <div>
              <p className="text-lg font-black text-slate-900 leading-none tracking-tighter">
                {s.value}
              </p>
              <p className="text-[8px] text-slate-400 font-black uppercase mt-1 tracking-widest">
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Управление */}
      <div className="space-y-3">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">
          Личные достижения
        </h3>

        <button
          onClick={() => navigate("/profile/completed")}
          className="w-full group flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[30px] active:scale-[0.98] active:bg-slate-50 transition-all shadow-sm hover:border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen size={22} />
            </div>
            <div className="text-left">
              <span className="block font-black text-slate-900 text-sm uppercase tracking-tighter">
                Мои успехи
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Пройденные тесты и курсы
              </span>
            </div>
          </div>
          <ChevronRight
            size={18}
            className="text-slate-300 group-hover:translate-x-1 transition-transform"
          />
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-5 text-red-500 bg-red-50/20 border border-red-100/50 rounded-[30px] active:scale-[0.98] transition-all group hover:bg-red-50">
          <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform">
            <LogOut size={20} />
          </div>
          <span className="font-black text-sm uppercase tracking-tighter">
            Выход
          </span>
        </button>
      </div>

      {/* Инфо */}
      <div className="pt-4 space-y-2">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent w-full" />
        <p className="text-center text-[9px] text-slate-300 font-black uppercase tracking-[0.3em]">
          Zoozavr LMS • 2026
        </p>
      </div>
    </div>
  );
}
