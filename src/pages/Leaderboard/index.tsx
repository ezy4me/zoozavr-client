import { Trophy, Medal, Star } from "lucide-react";

const LEADERS = [
  { id: 1, name: "Александр В.", points: 2450, avatar: "🦖", isMe: false },
  { id: 2, name: "Мария П.", points: 2100, avatar: "🐱", isMe: false },
  { id: 3, name: "Ты (Иван И.)", points: 1850, avatar: "🐶", isMe: true },
  { id: 4, name: "Дмитрий С.", points: 1600, avatar: "🐯", isMe: false },
  { id: 5, name: "Елена К.", points: 1200, avatar: "🐰", isMe: false },
];

export default function LeaderboardPage() {
  return (
    <div className="p-6 space-y-6">
      <header className="text-center space-y-2">
        <div className="inline-flex p-3 bg-orange-100 rounded-2xl text-orange-600">
          <Trophy size={32} />
        </div>
        <h1 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">
          Рейтинг Zoozavr
        </h1>
        <p className="text-slate-500 text-sm">
          Топ сотрудников по заработанным XP
        </p>
      </header>

      <div className="space-y-3">
        {LEADERS.map((user, index) => (
          <div
            key={user.id}
            className={`flex items-center gap-4 p-4 rounded-[24px] transition-all ${
              user.isMe
                ? "bg-green-600 text-white shadow-lg shadow-green-100"
                : "bg-white border border-slate-100"
            }`}>
            <div className="w-8 font-black text-lg italic">
              {index + 1 <= 3 ? (
                <Medal
                  className={
                    index === 0
                      ? "text-yellow-400"
                      : index === 1
                        ? "text-slate-400"
                        : "text-orange-400"
                  }
                />
              ) : (
                `#${index + 1}`
              )}
            </div>

            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl shadow-inner">
              {user.avatar}
            </div>

            <div className="flex-1">
              <p
                className={`font-bold text-sm ${user.isMe ? "text-white" : "text-slate-900"}`}>
                {user.name}
              </p>
              <div className="flex items-center gap-1">
                <Star
                  size={10}
                  className={user.isMe ? "text-green-200" : "text-orange-400"}
                  fill="currentColor"
                />
                <span
                  className={`text-[10px] font-black uppercase ${user.isMe ? "text-green-100" : "text-slate-400"}`}>
                  {user.points} XP
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
