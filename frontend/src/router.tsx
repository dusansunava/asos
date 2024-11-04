import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import GuestLayout from "@/pages/guest/layout";
import UserLayout from "@/pages/user/layout";
const RegisterPage = lazy(() => import("@/pages/guest/register/page"));
const LoginPage = lazy(() => import("@/pages/guest/login/page"));
const WelcomePage = lazy(() => import("@/pages/guest/welcome/page"));
const NotFoundPage = lazy(() => import("@/pages/not-found/page"));
const HomePage = lazy(() => import("@/pages/user/home/page"));
const SettingsPage = lazy(() => import("@/pages/user/settings/page"));
const PortfoliosPage = lazy(() => import("@/pages/user/portfolios/page"));
const AssetsPage = lazy(() => import("@/pages/user/assets/page"));
const LeaderBoardsPage = lazy(() => import("@/pages/user/leader-boards/page"));
const VerifyEmailPage = lazy(() => import("@/pages/guest/verify-email/page"));
const ResetPasswordPage = lazy(
  () => import("@/pages/guest/reset-password/page")
);
import { Loader2 } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="w-full py-4 flex items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin" />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<GuestLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<PageLoader />}>
              <WelcomePage />
            </Suspense>
          }
        />
        <Route
          path="login"
          element={
            <Suspense fallback={<PageLoader />}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path="register"
          element={
            <Suspense fallback={<PageLoader />}>
              <RegisterPage />
            </Suspense>
          }
        />
        <Route
          path="verify-email"
          element={
            <Suspense fallback={<PageLoader />}>
              <VerifyEmailPage />
            </Suspense>
          }
        />
        <Route
          path="reset-password"
          element={
            <Suspense fallback={<PageLoader />}>
              <ResetPasswordPage />
            </Suspense>
          }
        />
      </Route>
      <Route path="/" element={<UserLayout />}>
        <Route
          path="home"
          element={
            <Suspense fallback={<PageLoader />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="assets"
          element={
            <Suspense fallback={<PageLoader />}>
              <AssetsPage />
            </Suspense>
          }
        />
        <Route
          path="portfolios"
          element={
            <Suspense fallback={<PageLoader />}>
              <PortfoliosPage />
            </Suspense>
          }
        />
        <Route
          path="leader-boards"
          element={
            <Suspense fallback={<PageLoader />}>
              <LeaderBoardsPage />
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={<PageLoader />}>
              <SettingsPage />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <Suspense fallback={<PageLoader />}>
            <NotFoundPage />
          </Suspense>
        }
      />
    </Route>
  )
);
export default router;
