import { useNavigate } from "react-router-dom";
import { ChevronLeft, Bell, Shield, Eye, Smartphone, Trash2 } from "lucide-react";
import { Button } from "@/shared/ui/button";

export default function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full bg-white">
      <div className="p-4 flex items-center gap-4 border-b sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-black text-lg uppercase tracking-tighter">Настройки</h1>
      </div>

      <div className="p-6 space-y-8">
        <section className="space-y-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Аккаунт</h2>
          <div className="bg-slate-50 rounded-[32px] p-2 space-y-1">
            <SettingItem icon={<Shield size={18} />} label="Безопасность" sub="Смена пароля и ПИН-кода" />
            <SettingItem icon={<Eye size={18} />} label="Конфиденциальность" sub="Кто видит ваш рейтинг" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Система</h2>
          <div className="bg-slate-50 rounded-[32px] p-2 space-y-1">
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Bell size={18} /></div>
                <span className="font-bold text-sm">Push-уведомления</span>
              </div>
              <input type="checkbox" className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-green-500 transition-all relative after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 checked:after:left-5 after:transition-all" defaultChecked />
            </div>
            <SettingItem icon={<Smartphone size={18} />} label="Оффлайн-режим" sub="Управление кешем материалов" />
          </div>
        </section>

        <section className="pt-4">
          <Button 
            variant="ghost" 
            className="w-full h-14 justify-start px-6 gap-4 text-red-500 hover:bg-red-50 rounded-2xl border border-red-100"
            onClick={() => {
              localStorage.removeItem("auth");
              navigate("/login");
            }}
          >
            <Trash2 size={20} />
            <span className="font-bold">Выйти из аккаунта</span>
          </Button>
          <p className="text-center text-[10px] text-slate-400 mt-6 font-medium">Версия приложения: 1.0.2 (beta)</p>
        </section>
      </div>
    </div>
  );
}

function SettingItem({ icon, label, sub }: { icon: any, label: string, sub: string }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 active:bg-slate-50 transition-all cursor-pointer">
      <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">{icon}</div>
      <div className="flex-1">
        <p className="font-bold text-sm text-slate-900 leading-none">{label}</p>
        <p className="text-[10px] text-slate-400 mt-1">{sub}</p>
      </div>
    </div>
  );
}