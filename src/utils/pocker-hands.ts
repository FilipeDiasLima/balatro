import { CardProps } from "@/interfaces/card";
import { PockerHand } from "@/interfaces/pocker-hand";

export const initialPockerHands: PockerHand[] = [
  {
    id: 1,
    name: "Straight Flush",
    level: 1,
    chips: 100,
    mult: 8,
  },
  {
    id: 2,
    name: "Quadra",
    level: 1,
    chips: 60,
    mult: 7,
  },
  {
    id: 3,
    name: "Full House",
    level: 1,
    chips: 40,
    mult: 4,
  },
  {
    id: 4,
    name: "Flush",
    level: 1,
    chips: 35,
    mult: 4,
  },
  {
    id: 5,
    name: "Sequência",
    level: 1,
    chips: 30,
    mult: 4,
  },
  {
    id: 6,
    name: "Trinca",
    level: 1,
    chips: 30,
    mult: 3,
  },
  {
    id: 7,
    name: "Dois Pares",
    level: 1,
    chips: 20,
    mult: 2,
  },
  {
    id: 8,
    name: "Par",
    level: 1,
    chips: 10,
    mult: 2,
  },
  {
    id: 9,
    name: "Carta Alta",
    level: 1,
    chips: 5,
    mult: 1,
  },
];

export function reducerPockerHands(state: PockerHand[], action: any) {
  switch (action.type) {
    case "LEVEL":
      return state.map((hand) =>
        hand.id === action.payload.id
          ? { ...hand, level: action.payload.level }
          : hand,
      );
    case "RESET":
      return initialPockerHands.map((hand) => ({
        ...hand,
        level: 1, // Resetting level to 1
      }));
    default:
      return state;
  }
}

export function getPockerHandByCards(cards: CardProps[]): number {
  if (cards.length === 0) return 0;

  const values = cards.map((c) => c.value);
  const naipes = cards.map((c) => c.naipe);

  const valueMap: Record<string, number> = {
    Ace: 14,
    King: 13,
    Queen: 12,
    Jack: 11,
    "10": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
  };

  const numValues = values.map((v) => valueMap[v]).sort((a, b) => a - b);

  const valueCount: Record<string, number> = {};
  values.forEach((v) => (valueCount[v] = (valueCount[v] || 0) + 1));
  const naipeCount: Record<string, number> = {};
  naipes.forEach((n) => (naipeCount[n] = (naipeCount[n] || 0) + 1));

  const isFlush = Object.values(naipeCount).some(
    (count) => count === cards.length,
  );
  const isStraight =
    numValues.length > 1 &&
    numValues.every((v, i, arr) => (i === 0 ? true : v === arr[i - 1] + 1));

  const isLowAceStraight =
    numValues.includes(14) &&
    numValues.slice(0, 4).join(",") === "2,3,4,5" &&
    numValues.length === 5;

  const counts = Object.values(valueCount).sort((a, b) => b - a);

  // Straight Flush
  if ((isStraight || isLowAceStraight) && isFlush && cards.length >= 5)
    return 1;
  // Quadra
  if (counts[0] === 4) return 2;
  // Full House
  if (counts[0] === 3 && counts[1] === 2) return 3;
  // Flush
  if (isFlush && cards.length >= 5) return 4;
  // Sequência
  if ((isStraight || isLowAceStraight) && cards.length >= 5) return 5;
  // Trinca
  if (counts[0] === 3) return 6;
  // Dois Pares
  if (counts[0] === 2 && counts[1] === 2) return 7;
  // Par
  if (counts[0] === 2) return 8;
  // Carta Alta
  return 9;
}
