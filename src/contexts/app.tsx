import { UserProps } from "@/interfaces/user";
import { createContext, ReactNode, useState } from "react";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextProps {
  user: UserProps;
  wins: number;
  updateNickName: (nickname: string) => void;
}

export const AppContext = createContext({} as AppContextProps);

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<UserProps>({
    nickname: "P1",
  });
  const [wins, setWins] = useState(3);

  function updateNickName(nickname: string) {
    setUser((prevUser) => ({ ...prevUser, nickname }));
  }

  return (
    <AppContext.Provider value={{ user, wins, updateNickName }}>
      {children}
    </AppContext.Provider>
  );
}
