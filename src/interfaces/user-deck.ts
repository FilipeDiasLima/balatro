export interface DeckProps {
  id: string;
  naipe: "hearts" | "diamonds" | "clubs" | "spades";
  cards: [
    {
      id: "Ace";
      available: boolean;
    },
    {
      id: "2";
      available: boolean;
    },
    {
      id: "3";
      available: boolean;
    },
    {
      id: "4";
      available: boolean;
    },
    {
      id: "5";
      available: boolean;
    },
    {
      id: "6";
      available: boolean;
    },
    {
      id: "7";
      available: boolean;
    },
    {
      id: "8";
      available: boolean;
    },
    {
      id: "9";
      available: boolean;
    },
    {
      id: "10";
      available: boolean;
    },
    {
      id: "Jack";
      available: boolean;
    },
    {
      id: "Queen";
      available: boolean;
    },
    {
      id: "King";
      available: boolean;
    },
  ];
}

export interface UserDeckProps {
  deck: DeckProps[];
  jokers: string[];
}
