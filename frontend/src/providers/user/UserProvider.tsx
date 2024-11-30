import {ReactNode, createContext, useContext} from "react";
import useQueryRequest from "@/lib/fetch/useQueryRequest.ts";
import {User} from "@/providers/user/schema.ts";
import {Loader2} from "lucide-react";

type AuthProviderState = {
  user?: User;
};

const initialState = {
  user: undefined,
};

const UserProviderContext = createContext<AuthProviderState>(initialState);

const UserProvider = ({children}: { children: ReactNode }) => {
  const {data, isLoading} = useQueryRequest<User>({
    url: "/me"
  });

  return (
    <UserProviderContext.Provider value={{user: data}}>
      {isLoading ?
        <div className="h-screen flex items-center justify-center w-full">
          <Loader2 className="w-8 h-8 animate-spin"/>
        </div> :
        children}
    </UserProviderContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserProviderContext);

  if (context === undefined)
    throw new Error("useUser must be used within a UserProvider");

  return context;
};

export default UserProvider;
