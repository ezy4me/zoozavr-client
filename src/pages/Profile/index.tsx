import { Settings, LogOut, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="p-6 space-y-8 text-center">
      <div className="relative inline-block mt-4">
        <div className="w-24 h-24 rounded-[36px] bg-slate-200 mx-auto border-4 border-white shadow-xl" />
        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1.5 rounded-xl border-2 border-white">
          <ShieldCheck size={16} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-black text-slate-900">
          Александр Зоозавров
        </h2>
        <p className="text-slate-500 text-sm">Старший продавец-консультант</p>
      </div>

      <div className="space-y-3 pt-4">
        <button className="w-full flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-3xl font-bold text-slate-700 active:bg-slate-50 transition-colors">
          <Settings size={20} className="text-slate-400" /> Настройки
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-4 bg-red-50 border border-red-100 rounded-3xl font-bold text-red-600 active:bg-red-100 transition-colors">
          <LogOut size={20} /> Выйти
        </button>
      </div>
    </div>
  );
}
