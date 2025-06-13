export interface GameRoundProps {
  deck: string;
  money: number;
  round: number;
  ante: number;
  hands: number;
  discards: number;
  blindSelected?: "small" | "big" | "boss" | null;
  discardedCards?: { naipe: string; value: string }[];
}

export interface BlindGameProps {
  type: "small" | "big" | "boss";
  score: number;
  rewardAmount: number;
  tag: string;
}
