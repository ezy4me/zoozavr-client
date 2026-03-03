import { Home, BookOpen, Trophy, User, type LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/shared/lib/utils";

// Описываем структуру одного пункта меню
interface NavItem {
  label: string;
  icon: LucideIcon;
  path: string;
}

const navItems: NavItem[] = [
  { label: "Главная", icon: Home, path: "/" },
  { label: "Курсы", icon: BookOpen, path: "/courses" },
  { label: "Рейтинг", icon: Trophy, path: "/leaderboard" },
  { label: "Профиль", icon: User, path: "/profile" },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-110 h-16 bg-white border-t border-slate-200 flex items-center justify-around px-2 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon; // Теперь TS уверен, что это компонент иконки

        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "relative flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
              isActive
                ? "text-green-700"
                : "text-slate-400 hover:text-slate-600",
            )}>
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{item.label}</span>

            {isActive && (
              <div className="absolute top-0 w-8 h-1 bg-green-700 rounded-b-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};
