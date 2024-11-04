import useQueryRequest from "@/lib/fetch/useQueryRequest";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useState, useEffect } from "react";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLang?: string;
};

type LanguageProviderState = {
  language: string;
  setLanguage: (language: string) => void;
  messages: { [key: string]: string };
  isLoading: boolean;
};

const initialState = {
  language: "en",
  setLanguage: () => null,
  messages: {},
  isLoading: true,
};

const supportedLanguages = ["sk", "en"];

const LanguageProviderContext =
  createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
  children,
  defaultLang = "en",
  ...props
}: LanguageProviderProps) {
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState({});
  const [language, setLanguage] = useState<string>(() => {
    const localStoreLocale = localStorage.getItem("language");
    if (localStoreLocale && supportedLanguages.includes(localStoreLocale)) {
      return localStoreLocale;
    }
    const browserLocale = navigator.language.split("-")[0];
    if (supportedLanguages.includes(browserLocale)) {
      localStorage.setItem("language", browserLocale);
      return browserLocale;
    }
    localStorage.setItem("language", defaultLang);
    return defaultLang;
  });

  const { data, isLoading, isError, isFetching } = useQueryRequest<{}>({
    url: "/translations",
    staleTime: Number.MAX_SAFE_INTEGER,
    gcTime: Number.MAX_SAFE_INTEGER,
  });

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setMessages(data as { [key: string]: string });
    }
  }, [data]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["/translations"],
      exact: true,
      refetchType: "active",
    });
  }, [language]);

  return (
    <LanguageProviderContext.Provider
      {...props}
      value={{
        language,
        setLanguage: (_language: string) => {
          localStorage.setItem("language", _language);
          setLanguage(_language);
        },
        messages,
        isLoading: isLoading || isFetching,
      }}
    >
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};
