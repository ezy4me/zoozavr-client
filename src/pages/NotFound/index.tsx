import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/shared/ui/button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-center">
      <div className="relative mb-8">
        <div className="text-[120px] font-black text-slate-200 leading-none select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-6xl animate-bounce-slow">
          🦖
        </div>
      </div>

      <div className="space-y-3 mb-10">
        <h1 className="text-2xl font-black text-slate-900 uppercase italic">
          Ой! Пустота...
        </h1>
        <p className="text-slate-500 max-w-[240px] mx-auto font-medium">
          Похоже, эта страница ушла на обед или её никогда не существовало в
          нашей базе.
        </p>
      </div>

      <div className="w-full max-w-[280px] space-y-3">
        <Button
          onClick={() => navigate("/")}
          className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl shadow-slate-200">
          <Home size={18} />
          НА ГЛАВНУЮ
        </Button>

        <button
          onClick={() => navigate(-1)}
          className="w-full py-4 text-slate-400 font-bold text-sm flex items-center justify-center gap-2 hover:text-slate-600 transition-colors">
          <ArrowLeft size={16} />
          Вернуться назад
        </button>
      </div>

      <div className="absolute bottom-10 text-[10px] font-black text-slate-300 uppercase tracking-widest">
        Зоозавр Команда
      </div>
    </div>
  );
}
