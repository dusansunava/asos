import { ReactNode, createContext, useState, useContext } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthProviderState = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const initialState = {
  token: null,
  setToken: () => null,
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

const AuthProvider = ({ children, ...props }: AuthProviderProps) => {
  const [token, _setToken] = useState<string | null>(
    sessionStorage.getItem("token")
  );

  const value = {
    token,
    setToken: (token: string | null) => {
      _setToken(token);
      if (token) {
        sessionStorage.setItem("token", token);
      } else {
        sessionStorage.removeItem("token");
      }
    },
  };

  return (
    <AuthProviderContext.Provider {...props} value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined)
    throw new Error("useAuthContext must be used within a AuthProvider");

  return context;
};

export default AuthProvider;
