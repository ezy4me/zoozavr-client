import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginPage from "@/pages/Login";
import HomePage from "@/pages/Home";
import CoursesPage from "@/pages/Courses";
import CategoryPage from "@/pages/Category";
import SubcategoryPage from "@/pages/Subcategory";
import CourseDetailPage from "@/pages/CourseDetail";
import LeaderboardPage from "@/pages/Leaderboard";
import ProfilePage from "@/pages/Profile";
import { ProtectedRoute } from "./providers/ProtectedRoute";
import { BottomNav } from "@/widgets/BottomNav/ui/BottomNav";

const MainLayout = () => (
  <div className="min-h-screen bg-slate-50 flex justify-center">
    <div className="w-full max-w-[440px] bg-white min-h-screen shadow-2xl relative flex flex-col border-x border-slate-200">
      <main className="flex-1 pb-20 overflow-y-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  </div>
);

const router = createBrowserRouter(
  [
    { path: "/login", element: <LoginPage /> },
    {
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <HomePage /> }, // Только активный прогресс
        { path: "/courses", element: <CoursesPage /> }, // Список Категорий
        { path: "/category/:id", element: <CategoryPage /> }, // Список Подкатегорий
        { path: "/subcategory/:id", element: <SubcategoryPage /> }, // Список Курсов
        { path: "/course/:id", element: <CourseDetailPage /> }, // Уроки и Тесты
        { path: "/leaderboard", element: <LeaderboardPage /> },
        { path: "/profile", element: <ProfilePage /> },
      ],
    },
  ],
  { basename: "/zoozavr-client" },
);

export const AppRouter = () => <RouterProvider router={router} />;
