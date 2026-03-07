import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Bell,
  Shield,
  Smartphone,
  LogOut,
  Trash2,
  Database,
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useUserStore } from "@/shared/store/useUserStore";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { logout, name } = useUserStore();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Реальная очистка кеша PWA
  const clearCache = async () => {
    if ("serviceWorker" in navigator) {
      const names = await caches.keys();
      await Promise.all(names.map((name) => caches.delete(name)));
      window.location.reload();
    } else {
      alert("Оффлайн-данные не найдены");
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-white animate-in fade-in duration-500">
      {/* Шапка */}
      <div className="p-4 flex items-center gap-4 border-b sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-black text-lg uppercase italic tracking-tighter text-slate-900">
          Настройки
        </h1>
      </div>

      <div className="p-6 space-y-8">
        {/* Блок профиля (информационный) */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Ваш аккаунт
          </h2>
          <div className="bg-slate-50 rounded-[32px] p-2">
            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-xl">
                🦖
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900">
                  {name || "Сотрудник"}
                </p>
                <p className="text-[10px] text-slate-400 uppercase font-black">
                  Доступ: Полный
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Настройки приложения */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Интерфейс и данные
          </h2>
          <div className="bg-slate-50 rounded-[32px] p-2 space-y-1">
            {/* Уведомления */}
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Bell size={18} />
                </div>
                <span className="font-bold text-sm">Push-уведомления</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>

            {/* Работа с кешем (Очистка) */}
            <div
              onClick={clearCache}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 active:bg-slate-50 transition-all cursor-pointer group">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-active:scale-90 transition-transform">
                <Database size={18} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-slate-900 leading-none">
                  Сбросить кеш
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Очистить локальные данные
                </p>
              </div>
              <Smartphone size={16} className="text-slate-300" />
            </div>
          </div>
        </section>

        {/* Безопасность */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Приватность
          </h2>
          <div className="bg-slate-50 rounded-[32px] p-2">
            <SettingItem
              icon={<Shield size={18} />}
              label="Статус обучения"
              sub="Виден администратору"
              active={false}
            />
          </div>
        </section>

        {/* Кнопка выхода */}
        <section className="pt-4 space-y-3">
          <Button
            variant="ghost"
            className="w-full h-16 justify-center gap-3 text-red-500 hover:bg-red-50 rounded-[24px] border border-red-100 transition-all active:scale-95"
            onClick={handleLogout}>
            <LogOut size={20} />
            <span className="font-black uppercase tracking-tighter">
              Выйти из системы
            </span>
          </Button>

          <div className="flex flex-col items-center gap-1">
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
              Зоозавр Платформа v1.0.2
            </p>
            <div className="h-1 w-8 bg-slate-100 rounded-full" />
          </div>
        </section>
      </div>
    </div>
  );
}

function SettingItem({
  icon,
  label,
  sub,
  active = true,
}: {
  icon: any;
  label: string;
  sub: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 transition-all ${active ? "active:bg-slate-50 cursor-pointer" : "opacity-70"}`}>
      <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">{icon}</div>
      <div className="flex-1">
        <p className="font-bold text-sm text-slate-900 leading-none">{label}</p>
        <p className="text-[10px] text-slate-400 mt-1 uppercase font-medium">
          {sub}
        </p>
      </div>
    </div>
  );
}
