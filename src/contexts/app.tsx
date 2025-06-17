import { LoseRoundModal } from "@/components/modals/lose-round-modal";
import { useSound } from "@/hooks/use-sound";
import { BlindProps } from "@/interfaces/blind";
import { CardProps } from "@/interfaces/card";
import { GameRoundProps } from "@/interfaces/game";
import { PlayHandProps } from "@/interfaces/play-hand";
import { PockerHand } from "@/interfaces/pocker-hand";
import { UserProps } from "@/interfaces/user";
import { UserDeckProps } from "@/interfaces/user-deck";
import { initialBlinds, reducerBlinds } from "@/utils/blinds";
import { initialGameRound, reducerGameRound } from "@/utils/game-round";
import { jokers } from "@/utils/jokers";
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
  openStore: boolean;
  showReward: boolean;
  jokerAnimation: {
    value: string;
    turn: boolean;
  }[];
  setGameStarted: (started: boolean) => void;
  nextRound: () => void;
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
  setOpenStore: (open: boolean) => void;
  buyJoker: (joker: string) => void;
  sellJoker: (joker: string) => void;
  toggleJokerAnimation: (joker: string) => void;
}

export const AppContext = createContext({} as AppContextProps);

export function AppProvider({ children }: AppProviderProps) {
  const playChipsSound = useSound("/sounds/chips2.ogg");
  const playCardSound = useSound("/sounds/card1.ogg");
  const playCoinSound = useSound("/sounds/coin1.ogg");

  const [user, setUser] = useState<UserProps>({
    nickname: "P1",
  });
  const [openStore, setOpenStore] = useState(true);
  const [wins, setWins] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [currentPockerHand, setCurrentPockerHand] = useState<PockerHand | null>(
    null,
  );
  const [blindSelected, setBlindSelected] = useState<"small" | "big" | "boss">(
    "small",
  );
  const [openLoseRoundModal, setOpenLoseRoundModal] = useState(false);
  const [handScore, setHandScore] = useState(0);
  const [roundHand, setRoundHand] = useState<CardProps[]>([]);
  const [cardsSelected, setCardsSelected] = useState<CardProps[]>([]);
  const [playHand, setPlayHand] = useState<PlayHandProps>({
    chips: 0,
    mult: 0,
  });
  const [jokerAnimation, setJokerAnimation] = useState<
    {
      value: string;
      turn: boolean;
    }[]
  >([]);

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
    dispatchGameRound({
      type: "ADD_MONEY",
      payload: { money: blind === "big" ? 5 : 2 },
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
    setOpenLoseRoundModal(false);
    setWins(0);
    dispatchBlinds({ type: "RESET" });
    dispatchPockerHands({ type: "RESET" });
    setBlindSelected("small");
    dispatchGameRound({ type: "START" });
    dispatchUserDeck({ type: "RESET" });
    setRoundHand([]);
    setCurrentPockerHand(null);
    setOpenStore(true);
    setCardsSelected([]);
    setPlayHand({
      chips: 0,
      mult: 0,
    });
  }

  function nextRound() {
    playCoinSound();
    const selectedBlind = blinds.find(
      (blind: BlindProps) => blind.type === gameRound.blindSelected,
    );
    dispatchUserDeck({ type: "NEXT_ROUND" });
    setRoundHand([]);
    if (selectedBlind.type !== "boss") {
      dispatchBlinds({
        type: "FINISH",
        payload: { blind: gameRound.blindSelected },
      });
      setBlindSelected(blindSelected === "small" ? "big" : "boss");
    } else {
      dispatchBlinds({
        type: "NEXT_LEVEL",
      });
      setBlindSelected("small");
    }
    dispatchGameRound({
      type: "END_ROUND",
      payload: {
        money: (selectedBlind.rewardAmount || 0) + gameRound.hands,
      },
    });
    setCurrentPockerHand(null);
    setCardsSelected([]);
    setPlayHand({
      chips: 0,
      mult: 0,
    });
    setOpenStore(true);
    setShowReward(false);
  }

  function updateNickName(nickname: string) {
    setUser((prevUser) => ({ ...prevUser, nickname }));
  }

  const getCardFromDeck = (roundHandParam: CardProps[]) => {
    playCardSound();
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
    playChipsSound();
    setPlayHand((prev) => {
      setHandScore(prev.chips * prev.mult);
      dispatchGameRound({
        type: "UPDATE_SCORE",
        payload: {
          currentScore:
            (prev.chips * prev.mult) / (blindSelected === "boss" ? 4 : 2),
        },
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

  function toggleJokerAnimation(joker: string) {
    setJokerAnimation((prev) =>
      prev.map((item) =>
        item.value === joker ? { ...item, turn: !item.turn } : item,
      ),
    );
  }

  function buyJoker(joker: string) {
    const jokerDetails = jokers.find((item) => item.value === joker);

    if (gameRound.money < (jokerDetails?.price || 0)) {
      return;
    }

    dispatchUserDeck({
      type: "ADD_JOKER",
      payload: { joker },
    });

    dispatchGameRound({
      type: "SUBTRACT_MONEY",
      payload: { money: jokerDetails?.price || 0 },
    });
    setJokerAnimation((prev) => [...prev, { value: joker, turn: false }]);
  }

  function sellJoker(joker: string) {
    dispatchUserDeck({
      type: "REMOVE_JOKER",
      payload: { joker },
    });
    dispatchGameRound({
      type: "ADD_MONEY",
      payload: { money: 2 },
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

  useEffect(() => {
    const timer = setTimeout(() => {
      const blindFound = blinds.find(
        (blind: BlindProps) => blind.type === blindSelected,
      ) as BlindProps;
      if (gameRound.hands <= 0) {
        if (gameRound.currentScore < blindFound.score) {
          setOpenLoseRoundModal(true);
        } else {
          playCoinSound();
          setShowReward(true);
        }
      }

      if (gameRound.currentScore >= blindFound.score) {
        playCoinSound();
        setShowReward(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [gameRound]);

  return (
    <AppContext.Provider
      value={{
        user,
        openStore,
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
        showReward,
        jokerAnimation,
        setGameStarted,
        nextRound,
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
        setOpenStore,
        buyJoker,
        sellJoker,
        toggleJokerAnimation,
      }}
    >
      {children}
      <LoseRoundModal
        open={openLoseRoundModal}
        backToMenu={() => {
          setGameStarted(false);
          resetGame();
        }}
        action={() => {
          nextRound();
          setOpenLoseRoundModal(false);
        }}
      />
    </AppContext.Provider>
  );
}
