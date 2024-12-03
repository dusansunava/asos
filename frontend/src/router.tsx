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
const ProfilePage = lazy(() => import("@/pages/user/profile/page"));
const PlanPage = lazy(() => import("@/pages/user/plan/page"));
const TrainingPage = lazy(() => import("@/pages/user/trainings/page"));
const FoodPage = lazy(() => import("@/pages/user/food/page"));
const CreateExercisePage = lazy(() => import("@/pages/user/exercise/create/page"));
const OwnedExercisesPage = lazy(() => import("@/pages/user/exercise/owned/page"));
const AllExercisesPage = lazy(() => import("@/pages/user/exercise/all/page"));
const ResetPasswordPage = lazy(
  () => import("@/pages/guest/reset-password/page")
);
const CreateFoodPage = lazy(
  () => import("@/pages/user/food/create/page")
);
const ExerciseDetailPage = lazy(
  () => import("@/pages/user/exercise/detail/page")
);
import { Loader2 } from "lucide-react";
import ExercisesLayout from "./pages/user/exercise/layout";

const PageLoader = () => {
  return (
    <div className="w-full py-4 flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
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
          path="exercise/create"
          element={
            <Suspense fallback={<PageLoader />}>
              <CreateExercisePage />
            </Suspense>
          }
        />
        <Route
          path="/exercises/detail/:id"
          element={
            <Suspense fallback={<PageLoader />}>
              <ExerciseDetailPage />
            </Suspense>
          }
        />
        <Route path="/exercises" element={<ExercisesLayout />}>
          <Route
            path="owned"
            element={
              <Suspense fallback={<PageLoader />}>
                <OwnedExercisesPage />
              </Suspense>
            }
          />
           <Route
              path="all"
              element={
                <Suspense fallback={<PageLoader />}>
                  <AllExercisesPage />
                </Suspense>
              }
            />
        </Route>
        <Route
          path="food"
          element={
            <Suspense fallback={<PageLoader />}>
              <FoodPage />
            </Suspense>
          }
        />
        <Route
          path="/food/create"
          element={
            <Suspense fallback={<PageLoader />}>
              <CreateFoodPage />
            </Suspense>
          }
        />
        <Route
          path="plan"
          element={
            <Suspense fallback={<PageLoader />}>
              <PlanPage />
            </Suspense>
          }
        />
        <Route
          path="training"
          element={
            <Suspense fallback={<PageLoader />}>
              <TrainingPage />
            </Suspense>
          }
        />
        <Route
          path="profile"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProfilePage />
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
