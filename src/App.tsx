import { useEffect } from "react"; // Добавляем useEffect
import { useRegisterSW } from "virtual:pwa-register/react";
import { AppRouter } from "@/app/router";
import { Button } from "@/shared/ui/button";
import { RefreshCw, X } from "lucide-react";
import { useUserStore } from "@/shared/store/useUserStore"; // Импортируем стор

function App() {
  const { checkAuth } = useUserStore(); // Берем метод проверки авторизации

  // Инициализация пользователя при загрузке приложения
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log("SW зарегистрирован:", r);
    },
    onRegisterError(error) {
      console.error("Ошибка регистрации SW:", error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <>
      <AppRouter />

      {(offlineReady || needRefresh) && (
        <div className="fixed bottom-24 left-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-slate-900 text-white p-4 rounded-[24px] shadow-2xl border border-white/10 flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-bold">
                {offlineReady
                  ? "Зоозавр готов к работе оффлайн!"
                  : "Доступно обновление системы!"}
              </p>
              {needRefresh && (
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-0.5">
                  Нажмите обновить для синхронизации
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {needRefresh && (
                <Button
                  onClick={() => updateServiceWorker(true)}
                  className="bg-green-600 hover:bg-green-500 text-white h-10 px-4 rounded-xl text-xs font-black flex items-center gap-2">
                  <RefreshCw size={14} />
                  ОБНОВИТЬ
                </Button>
              )}
              <button
                onClick={close}
                className="p-2 text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
