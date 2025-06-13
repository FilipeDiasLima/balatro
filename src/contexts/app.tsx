import { BlindProps } from "@/interfaces/blind";
import { CardProps } from "@/interfaces/card";
import { GameRoundProps } from "@/interfaces/game";
import { PlayHandProps } from "@/interfaces/play-hand";
import { PockerHand } from "@/interfaces/pocker-hand";
import { UserProps } from "@/interfaces/user";
import { UserDeckProps } from "@/interfaces/user-deck";
import { initialBlinds, reducerBlinds } from "@/utils/blinds";
import { initialGameRound, reducerGameRound } from "@/utils/game-round";
import {
  getPockerHandByCards,
  initialPockerHands,
  reducerPockerHands,
} from "@/utils/pocker-hands";
import {
  initialUserDeck,
  randomCardFromDeck,
  reducerUserDeck,
} from "@/utils/user-deck";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextProps {
  user: UserProps;
  wins: number;
  blinds: BlindProps[];
  pockerHands: PockerHand[];
  gameStarted: boolean;
  gameRound: GameRoundProps;
  blindSelected: "small" | "big" | "boss";
  roundHand: CardProps[];
  cardsSelected: CardProps[];
  userDeck: UserDeckProps;
  currentPockerHand: PockerHand | null;
  playHand: PlayHandProps;
  handScore: number;
  setGameStarted: (started: boolean) => void;
  updateNickName: (nickname: string) => void;
  levelUpPockerHand: (hand: PockerHand) => void;
  skipBlind: (blind: "small" | "big") => void;
  resetGame: () => void;
  getCardFromDeck: (roundHand: CardProps[]) => void;
  setBlindSelected: (blind: "small" | "big" | "boss") => void;
  chooseBlind: (blind: "small" | "big" | "boss") => void;
  handleDiscardCards: (params?: { isPlay?: boolean }) => void;
  handleCardClick: (card: CardProps) => void;
  setRoundHand: (cards: CardProps[]) => void;
  setChipsAndMult: (type: "chips" | "mult", value: number) => void;
  resetChipsAndMult: () => void;
  setNewScore: () => void;
  setCardsSelected: (cards: CardProps[]) => void;
  setHandScore: (score: number) => void;
}

export const AppContext = createContext({} as AppContextProps);

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<UserProps>({
    nickname: "P1",
  });
  const [wins, setWins] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPockerHand, setCurrentPockerHand] = useState<PockerHand | null>(
    null,
  );
  const [blindSelected, setBlindSelected] = useState<"small" | "big" | "boss">(
    "small",
  );
  const [handScore, setHandScore] = useState(0);
  const [roundHand, setRoundHand] = useState<CardProps[]>([]);
  const [cardsSelected, setCardsSelected] = useState<CardProps[]>([]);
  const [playHand, setPlayHand] = useState<PlayHandProps>({
    chips: 0,
    mult: 0,
  });
  const [blinds, dispatchBlinds] = useReducer(reducerBlinds, initialBlinds);
  const [pockerHands, dispatchPockerHands] = useReducer(
    reducerPockerHands,
    initialPockerHands,
  );
  const [gameRound, dispatchGameRound] = useReducer(
    reducerGameRound,
    initialGameRound,
  );
  const [userDeck, dispatchUserDeck] = useReducer(
    reducerUserDeck,
    initialUserDeck,
  );

  function levelUpPockerHand(hand: PockerHand) {
    dispatchPockerHands({
      type: "LEVEL",
      payload: { ...hand, level: hand.level + 1 },
    });
  }

  function skipBlind(blind: "small" | "big") {
    dispatchBlinds({
      type: "SKIP",
      payload: { blind },
    });
    setBlindSelected(blind === "small" ? "big" : "boss");
  }

  function chooseBlind(blind: "small" | "big" | "boss") {
    dispatchGameRound({
      type: "NEXT_ROUND",
      payload: { blindSelected: blind },
    });
  }

  function resetGame() {
    setWins(0);
    dispatchBlinds({ type: "RESET" });
    dispatchPockerHands({ type: "RESET" });
    setBlindSelected("small");
    dispatchGameRound({ type: "START" });
    dispatchUserDeck({ type: "RESET" });
    setRoundHand([]);
    setCurrentPockerHand(null);
    setCardsSelected([]);
    setPlayHand({
      chips: 0,
      mult: 0,
    });
  }

  function updateNickName(nickname: string) {
    setUser((prevUser) => ({ ...prevUser, nickname }));
  }

  const getCardFromDeck = (roundHandParam: CardProps[]) => {
    let localDeck = { ...userDeck, deck: [...userDeck.deck] };

    const newCard = randomCardFromDeck(localDeck);

    if (newCard) {
      localDeck.deck = localDeck.deck.map((deck) =>
        deck.naipe === newCard.naipe
          ? {
              ...deck,
              cards: (deck.cards as typeof deck.cards).map((card: any) =>
                card.id === newCard.value
                  ? { ...card, available: false }
                  : card,
              ) as typeof deck.cards,
            }
          : deck,
      );
      dispatchUserDeck({
        type: "GET_CARD",
        payload: { naipe: newCard.naipe, cardId: newCard.value },
      });
      setRoundHand((prevCards) => [...prevCards, newCard]);
    }
  };
  //     let localDeck = { ...userDeck, deck: [...userDeck.deck] };

  //     const newCard = randomCardFromDeck(localDeck);

  //     if (newCard) {
  //       localDeck.deck = localDeck.deck.map((deck) =>
  //         deck.naipe === newCard.naipe
  //           ? {
  //               ...deck,
  //               cards: (deck.cards as typeof deck.cards).map((card: any) =>
  //                 card.id === newCard.value
  //                   ? { ...card, available: false }
  //                   : card,
  //               ) as typeof deck.cards,
  //             }
  //           : deck,
  //       );
  //       dispatchUserDeck({
  //         type: "GET_CARD",
  //         payload: { naipe: newCard.naipe, cardId: newCard.value },
  //       });

  //       setRoundHand([...roundHand, newCard]);
  //     }
  //   },
  //   [userDeck, roundHand],
  // );

  const handleDiscardCards = useCallback(
    ({ isPlay = false }: { isPlay?: boolean } = {}) => {
      if (cardsSelected.length > 0) {
        if (!isPlay) {
          dispatchGameRound({
            type: "UPDATE_DISCARDS",
            payload: {
              discardedCards: cardsSelected,
              discards: gameRound.discards - 1,
            },
          });
        }
        const updateRoundHand = roundHand.filter(
          (card) =>
            !cardsSelected.some(
              (discarded) =>
                discarded.naipe === card.naipe &&
                discarded.value === card.value,
            ),
        );
        setRoundHand(updateRoundHand);
        setCardsSelected([]);
      }
    },
    [cardsSelected, userDeck, roundHand],
  );

  function handleCardClick(card: { naipe: string; value: string }) {
    const cardFound = cardsSelected.some(
      (c) => c.naipe === card.naipe && c.value === card.value,
    );
    if (cardFound) {
      setCardsSelected(
        cardsSelected.filter(
          (c) => !(c.naipe === card.naipe && c.value === card.value),
        ),
      );
    } else {
      if (cardsSelected.length < 5) {
        setCardsSelected([...cardsSelected, card]);
      }
    }
  }

  const setNewScore = useCallback(() => {
    setPlayHand((prev) => {
      setHandScore(prev.chips * prev.mult);
      dispatchGameRound({
        type: "UPDATE_SCORE",
        payload: { currentScore: (prev.chips * prev.mult) / 2 },
      });
      dispatchGameRound({
        type: "UPDATE_HANDS",
        payload: { hands: gameRound.hands - 1 },
      });
      return { chips: 0, mult: 0 };
    });

    setCardsSelected([]);
  }, [gameRound, playHand]);

  function setChipsAndMult(type: "chips" | "mult", value: number) {
    setPlayHand((prev) => ({
      ...prev,
      [type]: prev[type] + value,
    }));
  }

  function resetChipsAndMult() {
    setPlayHand({
      chips: 0,
      mult: 0,
    });
  }

  useEffect(() => {
    if (cardsSelected.length > 0) {
      const pockerHandScore = getPockerHandByCards(cardsSelected);
      setCurrentPockerHand(pockerHandScore.pockerHand || null);
      setPlayHand({
        chips: pockerHandScore.pockerHand
          ? pockerHandScore.pockerHand.chips
          : 0,
        mult: pockerHandScore.pockerHand ? pockerHandScore.pockerHand.mult : 0,
      });
    } else {
      setCurrentPockerHand(null);
    }
  }, [cardsSelected]);

  return (
    <AppContext.Provider
      value={{
        user,
        wins,
        pockerHands,
        blinds,
        gameStarted,
        blindSelected,
        gameRound,
        roundHand,
        userDeck,
        cardsSelected,
        currentPockerHand,
        playHand,
        handScore,
        setGameStarted,
        levelUpPockerHand,
        updateNickName,
        skipBlind,
        resetGame,
        setBlindSelected,
        chooseBlind,
        getCardFromDeck,
        handleDiscardCards,
        handleCardClick,
        setRoundHand,
        setChipsAndMult,
        resetChipsAndMult,
        setNewScore,
        setCardsSelected,
        setHandScore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
