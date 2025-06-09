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
