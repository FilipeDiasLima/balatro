import { BlindProps } from "@/interfaces/blind";

export const initialBlinds: BlindProps[] = [
  {
    score: 300,
    rewardAmount: 3,
    tag: "juggle",
    name: "Small Blind",
    type: "small",
    skipped: false,
  },
  {
    score: 450,
    rewardAmount: 4,
    tag: "investment",
    name: "Big Blind",
    type: "big",
    skipped: false,
  },
  {
    score: 600,
    rewardAmount: 5,
    name: "Boss Blind",
    type: "boss",
    skipped: false,
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
    case "RESET":
      return initialBlinds.map((blind) => ({
        ...blind,
        skipped: false, // Resetting skipped status
      }));
    default:
      return state;
  }
}
