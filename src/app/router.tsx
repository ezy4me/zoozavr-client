import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useOutlet,
} from "react-router-dom";
import LoginPage from "@/pages/Login";
import HomePage from "@/pages/Home";
import CoursesPage from "@/pages/Courses";
import CategoryPage from "@/pages/Category";
import SubcategoryPage from "@/pages/Subcategory";
import CourseDetailPage from "@/pages/CourseDetail";
import LeaderboardPage from "@/pages/Leaderboard";
import ProfilePage from "@/pages/Profile";
import TestPage from "@/pages/Test";
import { ProtectedRoute } from "./providers/ProtectedRoute";
import { BottomNav } from "@/widgets/BottomNav/ui/BottomNav";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/shared/ui/PageTransition";
import SettingsPage from "@/pages/Settings";
import NotFoundPage from "@/pages/NotFound";

const MainLayout = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-[440px] bg-white min-h-screen shadow-2xl relative flex flex-col border-x border-slate-200 overflow-hidden">
        <main className="flex-1 pb-20 overflow-y-auto relative">
          <AnimatePresence mode="wait" initial={false}>
            <PageTransition key={location.pathname}>{outlet}</PageTransition>
          </AnimatePresence>
        </main>
        <BottomNav />
      </div>
    </div>
  );
};

const router = createBrowserRouter(
  [
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
        { path: "/", element: <HomePage /> },
        { path: "/courses", element: <CoursesPage /> },
        { path: "/category/:id", element: <CategoryPage /> },
        { path: "/subcategory/:id", element: <SubcategoryPage /> },
        { path: "/course/:id", element: <CourseDetailPage /> },
        { path: "/leaderboard", element: <LeaderboardPage /> },
        { path: "/profile", element: <ProfilePage /> },
        { path: "/test/:id", element: <TestPage /> },
        { path: "/settings", element: <SettingsPage /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ],
  { basename: "/zoozavr-client" },
);

export const AppRouter = () => <RouterProvider router={router} />;
