import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem("auth", "true");
      setIsLoading(false);
      navigate("/");
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-60" />
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50" />

      <div className="flex-1 flex flex-col justify-center px-6 py-12 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-[28px] shadow-xl shadow-green-100 mb-6">
            <span className="text-5xl">🦖</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase italic">
            Зоозавр
          </h1>
          <p className="text-slate-500 font-medium">База знаний для команды</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5 max-w-sm mx-auto w-full">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-slate-600 ml-1 font-semibold">
              Электронная почта
            </Label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-3.5 text-slate-400"
                size={18}
              />
              <Input
                id="email"
                type="email"
                placeholder="ivanov@zoozavr.ru"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-11 h-12 bg-white border-slate-200 rounded-2xl focus:ring-green-500 focus:border-green-500 shadow-sm transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-slate-600 ml-1 font-semibold">
              Пароль
            </Label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-3.5 text-slate-400"
                size={18}
              />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-11 h-12 bg-white border-slate-200 rounded-2xl focus:ring-green-500 focus:border-green-500 shadow-sm transition-all"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black h-14 rounded-2xl shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group transition-all active:scale-[0.98]"
            disabled={isLoading}>
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Войти в систему
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </Button>
        </form>

        <p className="mt-10 text-center text-slate-400 text-sm">
          Забыли пароль?{" "}
          <span className="text-green-700 font-bold cursor-pointer">
            Связаться с IT
          </span>
        </p>
      </div>

      <div className="py-6 text-center text-slate-300 text-[10px] uppercase tracking-widest font-black">
        Обучение Зоозавр v1.0.2
      </div>
    </div>
  );
}
