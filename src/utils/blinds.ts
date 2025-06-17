import { BlindProps } from "@/interfaces/blind";

export const initialBlinds: BlindProps[] = [
  {
    score: 500,
    rewardAmount: 3,
    tag: "investment",
    name: "Small Blind",
    type: "small",
    skipped: false,
    finished: false,
  },
  {
    score: 700,
    rewardAmount: 4,
    tag: "investment",
    name: "Big Blind",
    type: "big",
    skipped: false,
    finished: false,
  },
  {
    score: 1000,
    rewardAmount: 5,
    name: "Boss Blind",
    type: "boss",
    skipped: false,
    finished: false,
  },
];

export function reducerBlinds(state: any, action: any) {
  switch (action.type) {
    case "SKIP":
      return state.map((blind: BlindProps) => {
        if (blind.type === action.payload.blind) {
          return { ...blind, skipped: true };
        }
        return blind;
      });
    case "FINISH":
      return state.map((blind: BlindProps) => {
        if (blind.type === action.payload.blind) {
          return { ...blind, finished: true };
        }
        return blind;
      });
    case "RESET":
      return initialBlinds.map((blind) => ({
        ...blind,
        skipped: false,
      }));
    case "NEXT_LEVEL":
      return state.map((blind: BlindProps) => {
        return {
          ...blind,
          score: blind.score * 1.2,
          skipped: false,
          finished: false,
        };
      });
    default:
      return state;
  }
}
