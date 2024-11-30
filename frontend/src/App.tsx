import { RouterProvider } from "react-router-dom";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/providers/theme";
import { LanguageProvider } from "@/providers/intl/IntlProvider";
import AuthProvider from "./providers/auth";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModalProvider } from "@/components/ui/modal/provider.tsx";
import { Modal } from "@/components/ui/modal";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <LanguageProvider>
            <ThemeProvider defaultTheme="dark" storageKey="theme">
              <RouterProvider router={router} />
            </ThemeProvider>
          </LanguageProvider>
          <Modal />
        </ModalProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
