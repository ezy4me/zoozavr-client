import { useEffect, useState } from "react";
import { Trophy, Medal, Star, RefreshCw } from "lucide-react";
import { useUserStore } from "@/shared/store/useUserStore";
import api from "@/shared/api"; 

interface ILeader {
  id: number;
  name: string;
  xp: number;
  avatar?: string;
}

export default function LeaderboardPage() {
  const { name: myName, xp: myXp } = useUserStore();
  const [leaders, setLeaders] = useState<ILeader[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const { data } = await api.get("/users/leaderboard");
        setLeaders(data);
      } catch (e) {
        console.error("Ошибка загрузки рейтинга:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  if (isLoading) {
    return (
      <div className="p-10 text-center flex flex-col items-center gap-4">
        <RefreshCw className="animate-spin text-slate-300" size={32} />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Считаем очки зоозавров...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <header className="text-center space-y-2">
        <div className="inline-flex p-3 bg-orange-100 rounded-2xl text-orange-600 shadow-inner">
          <Trophy size={32} />
        </div>
        <h1 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">
          Рейтинг Zoozavr
        </h1>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-tight">
          Топ сотрудников по заработанным XP
        </p>
      </header>

      <div className="space-y-3">
        {leaders.map((user, index) => {
          // Определяем, это "Я" по имени или ID (если ID есть в объекте)
          const isMe = user.name === myName;

          return (
            <div
              key={user.id}
              className={`flex items-center gap-4 p-4 rounded-[28px] transition-all duration-300 ${
                isMe
                  ? "bg-slate-900 text-white shadow-xl scale-[1.02] ring-4 ring-slate-900/10"
                  : "bg-white border border-slate-100 shadow-sm"
              }`}>
              {/* Место в рейтинге */}
              <div className="w-8 flex justify-center font-black text-lg italic">
                {index === 0 && <Medal className="text-yellow-400" size={24} />}
                {index === 1 && <Medal className="text-slate-400" size={24} />}
                {index === 2 && <Medal className="text-orange-400" size={24} />}
                {index > 2 && (
                  <span
                    className={`text-sm ${isMe ? "text-slate-400" : "text-slate-300"}`}>
                    #{index + 1}
                  </span>
                )}
              </div>

              {/* Аватар */}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${
                  isMe ? "bg-white/10" : "bg-slate-50"
                }`}>
                {user.avatar || "🦖"}
              </div>

              {/* Имя и очки */}
              <div className="flex-1">
                <p
                  className={`font-bold text-sm truncate ${isMe ? "text-white" : "text-slate-900"}`}>
                  {isMe ? `Ты (${user.name})` : user.name}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Star
                    size={12}
                    className={isMe ? "text-yellow-400" : "text-orange-400"}
                    fill="currentColor"
                  />
                  <span
                    className={`text-[11px] font-black uppercase tracking-tight ${
                      isMe ? "text-slate-400" : "text-slate-400"
                    }`}>
                    {user.xp.toLocaleString()} XP
                  </span>
                </div>
              </div>

              {/* Бейдж для ТОП-3 */}
              {index < 3 && (
                <div
                  className={`text-[8px] font-black px-2 py-1 rounded-full uppercase ${
                    index === 0
                      ? "bg-yellow-400 text-yellow-900"
                      : "bg-slate-100 text-slate-500"
                  }`}>
                  TOP
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Мотивационный футер */}
      <div className="p-6 bg-green-50 rounded-[32px] border-2 border-dashed border-green-200 text-center">
        <p className="text-[10px] font-black text-green-700 uppercase leading-relaxed">
          Проходи курсы и сдавай тесты,
          <br />
          чтобы подняться выше!
        </p>
      </div>
    </div>
  );
}
