export interface BlindProps {
  score: number;
  rewardAmount: number;
  tag?: string;
  name: string;
  type: "small" | "big" | "boss";
  skipped?: boolean;
}
