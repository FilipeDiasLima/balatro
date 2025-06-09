import { PockerHand } from "@/interfaces/pocker-hand";
import { UserProps } from "@/interfaces/user";
import { initialPockerHands } from "@/utils/pocker-hands";
import { createContext, ReactNode, useReducer, useState } from "react";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextProps {
  user: UserProps;
  wins: number;
  pockerHands: PockerHand[];
  updateNickName: (nickname: string) => void;
  levelUpPockerHand: (hand: PockerHand) => void;
}

export const AppContext = createContext({} as AppContextProps);

function reducerPockerHands(state: PockerHand[], action: any) {
  switch (action.type) {
    case "LEVEL":
      return state.map((hand) =>
        hand.id === action.payload.id
          ? { ...hand, level: action.payload.level }
          : hand,
      );
    default:
      return state;
  }
}

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<UserProps>({
    nickname: "P1",
  });
  const [wins, setWins] = useState(3);

  const [pockerHands, dispatchPockerHands] = useReducer(
    reducerPockerHands,
    initialPockerHands,
  );

  function levelUpPockerHand(hand: PockerHand) {
    dispatchPockerHands({
      type: "LEVEL",
      payload: { ...hand, level: hand.level + 1 },
    });
  }

  function updateNickName(nickname: string) {
    setUser((prevUser) => ({ ...prevUser, nickname }));
  }

  return (
    <AppContext.Provider
      value={{ user, wins, pockerHands, levelUpPockerHand, updateNickName }}
    >
      {children}
    </AppContext.Provider>
  );
}
