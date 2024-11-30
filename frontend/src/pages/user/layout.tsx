import UserMenu from "@/components/menu/UserMenu";
import { useAuthContext } from "@/providers/auth";
import { ReactNode, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Message } from "@/providers/intl/IntlMessage";
import { useQueryClient } from "@tanstack/react-query";
import useQueryRequest from "@/lib/fetch/useQueryRequest";
import { AxiosError } from "axios";
import UserProvider from "@/providers/user/UserProvider.tsx";

const UserLayout = () => {
  const navigate = useNavigate();
  const { token, setToken } = useAuthContext();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <UserProvider>
      <div className="min-h-screen w-full relative lg:pl-[250px] pt-14 lg:pt-0">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            queryClient.clear();
            setToken(null);
          }}
        >
          <PersistLogin>
            <UserMenu />
            <main className="text-center px-4 pb-6 py-6 w-full min-h-[calc(100vh-3.5rem)] lg:min-h-screen">
              <Outlet />
            </main>
          </PersistLogin>
        </ErrorBoundary>
      </div>
    </UserProvider>
  );
};

const PersistLogin = ({ children }: { children: ReactNode }) => {
  const { setToken } = useAuthContext();
  const { isLoading, data, isError } = useQueryRequest<{
    token: string;
  }>({
    url: "/refreshSession",
    queryKey: ["/refreshSession"],
    refetchInterval: 15 * 60 * 1000, // 15 min.
    retry: 3,
    throwOnError: (error: AxiosError) =>
      error.response?.status === 500 || error.response?.status === 401,
  });

  useEffect(() => {
    if (!isError && !isLoading && data) {
      setToken(data.token);
    }
  }, [data]);

  return children;
};

export default UserLayout;

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  if (error.response.status === 500) {
    return (
      <AlertModal
        resetFn={resetErrorBoundary}
        title="ErrorModal.title"
        description="ErrorModal.description"
      />
    );
  } else if (error.response.status === 401) {
    return (
      <AlertModal
        resetFn={resetErrorBoundary}
        title="EndSessionModal.title"
        description="EndSessionModal.description"
      />
    );
  }
};

const AlertModal = ({
  title,
  description,
  resetFn,
}: {
  description: string;
  title: string;
  resetFn: (...args: any[]) => void;
}) => {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <Message exactly>{title}</Message>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Message exactly>{description}</Message>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => resetFn()}>
            <Message exactly>Common.close</Message>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
