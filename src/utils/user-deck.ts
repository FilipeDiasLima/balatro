import { UserDeckProps } from "@/interfaces/user-deck";

export const initialUserDeck: UserDeckProps = {
  jokers: [],
  deck: [
    {
      id: "spades",
      naipe: "spades",
      cards: [
        { id: "Ace", available: true },
        { id: "2", available: true },
        { id: "3", available: true },
        { id: "4", available: true },
        { id: "5", available: true },
        { id: "6", available: true },
        { id: "7", available: true },
        { id: "8", available: true },
        { id: "9", available: true },
        { id: "10", available: true },
        { id: "Jack", available: true },
        { id: "Queen", available: true },
        { id: "King", available: true },
      ],
    },
    {
      id: "hearts",
      naipe: "hearts",
      cards: [
        { id: "Ace", available: true },
        { id: "2", available: true },
        { id: "3", available: true },
        { id: "4", available: true },
        { id: "5", available: true },
        { id: "6", available: true },
        { id: "7", available: true },
        { id: "8", available: true },
        { id: "9", available: true },
        { id: "10", available: true },
        { id: "Jack", available: true },
        { id: "Queen", available: true },
        { id: "King", available: true },
      ],
    },
    {
      id: "diamonds",
      naipe: "diamonds",
      cards: [
        { id: "Ace", available: true },
        { id: "2", available: true },
        { id: "3", available: true },
        { id: "4", available: true },
        { id: "5", available: true },
        { id: "6", available: true },
        { id: "7", available: true },
        { id: "8", available: true },
        { id: "9", available: true },
        { id: "10", available: true },
        { id: "Jack", available: true },
        { id: "Queen", available: true },
        { id: "King", available: true },
      ],
    },
    {
      id: "clubs",
      naipe: "clubs",
      cards: [
        { id: "Ace", available: true },
        { id: "2", available: true },
        { id: "3", available: true },
        { id: "4", available: true },
        { id: "5", available: true },
        { id: "6", available: true },
        { id: "7", available: true },
        { id: "8", available: true },
        { id: "9", available: true },
        { id: "10", available: true },
        { id: "Jack", available: true },
        { id: "Queen", available: true },
        { id: "King", available: true },
      ],
    },
  ],
};

export function reducerUserDeck(
  state: UserDeckProps,
  action: { type: string; payload?: any },
): UserDeckProps {
  switch (action.type) {
    case "RESET":
      return initialUserDeck;
    case "NEXT_ROUND":
      return {
        ...state,
        deck: initialUserDeck.deck,
      };
    case "GET_CARD": {
      const { naipe, cardId } = action.payload;
      return {
        ...state,
        deck: state.deck.map((deck) =>
          deck.naipe === naipe
            ? {
                ...deck,
                cards: deck.cards.map((card) =>
                  card.id === cardId ? { ...card, available: false } : card,
                ) as typeof deck.cards,
              }
            : deck,
        ),
      };
    }
    case "ADD_JOKER": {
      const { joker } = action.payload;

      if (state.jokers.includes(joker) || state.jokers.length >= 5) {
        return state;
      }

      return {
        ...state,
        jokers: [...state.jokers, joker],
      };
    }
    case "REMOVE_JOKER": {
      const { joker } = action.payload;
      return {
        ...state,
        jokers: state.jokers.filter((j) => j !== joker),
      };
    }
    default:
      return state;
  }
}

export function getAvailableCards(deck: UserDeckProps): {
  naipe: string;
  value: string;
}[] {
  return deck.deck.flatMap((d) =>
    d.cards
      .filter((c) => c.available)
      .map((c) => {
        return { naipe: d.naipe, value: c.id };
      }),
  );
}

export function randomCardFromDeck(deck: UserDeckProps): {
  naipe: string;
  value: string;
} | null {
  const availableCards = getAvailableCards(deck);
  if (availableCards.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * availableCards.length);
  return availableCards[randomIndex];
}
