import { Trophy, Medal } from "lucide-react";

export default function LeaderboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-900">Топ Зоозавров</h1>
        <Trophy className="text-yellow-500" size={28} />
      </div>

      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((pos) => (
          <div
            key={pos}
            className={`flex items-center gap-4 p-4 rounded-3xl ${pos === 1 ? "bg-yellow-50 border border-yellow-100" : "bg-white border border-slate-100"}`}>
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${pos === 1 ? "bg-yellow-400 text-white" : "bg-slate-100 text-slate-500"}`}>
              {pos}
            </span>
            <div className="w-10 h-10 rounded-full bg-slate-200" />
            <div className="flex-1">
              <p className="font-bold text-sm text-slate-900">
                Сотрудник #{pos * 123}
              </p>
              <p className="text-xs text-slate-400">2,450 XP</p>
            </div>
            {pos === 1 && <Medal className="text-yellow-500" />}
          </div>
        ))}
      </div>
    </div>
  );
}
