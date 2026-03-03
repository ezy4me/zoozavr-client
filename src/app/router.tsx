import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginPage from "@/pages/Login";
import { ProtectedRoute } from "./providers/ProtectedRoute";
import { BottomNav } from "@/widgets/BottomNav/ui/BottomNav";

const MainLayout = () => (
  <div className="min-h-screen bg-slate-50 flex justify-center">
    {/* Контейнер-телефон */}
    <div className="w-full max-w-[440px] bg-white min-h-screen shadow-2xl relative flex flex-col border-x border-slate-200">
      {/* Область контента */}
      <main className="flex-1 pb-20">
        {" "}
        {/* pb-20 чтобы контент не перекрывался нижней панелью */}
        <Outlet />
      </main>

      {/* Нижняя навигация */}
      <BottomNav />
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <div className="p-6">
            <h1 className="text-2xl font-black text-slate-900 mb-2">
              Привет, Зоозавр! 🦖
            </h1>
            <p className="text-slate-500 mb-6 text-sm">
              Твой путь обучения начинается здесь.
            </p>

            {/* Пример карточки курса */}
            <div className="p-4 rounded-3xl bg-green-700 text-white shadow-lg shadow-green-200">
              <span className="text-[10px] bg-white/20 px-2 py-1 rounded-full uppercase tracking-widest font-bold">
                Активный курс
              </span>
              <h3 className="text-xl font-bold mt-2">Введение в Зоозавр</h3>
              <div className="mt-4 flex items-center justify-between">
                <div className="h-1.5 flex-1 bg-white/20 rounded-full mr-4">
                  <div className="h-full bg-white w-1/3 rounded-full" />
                </div>
                <span className="text-xs font-bold">33%</span>
              </div>
            </div>
          </div>
        ),
      },
      {
        path: "/courses",
        element: (
          <div className="p-6">
            <h1>Список курсов</h1>
          </div>
        ),
      },
      {
        path: "/leaderboard",
        element: (
          <div className="p-6">
            <h1>Рейтинг</h1>
          </div>
        ),
      },
      {
        path: "/profile",
        element: (
          <div className="p-6">
            <h1>Профиль</h1>
          </div>
        ),
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
