export interface PockerHand {
  id: number;
  name: string;
  level: number;
  chips: number;
  mult: number;
}

type PockerHandAction = "LEVEL";

export interface ReducerPockerHandsProps {
  state: PockerHand[];
  action: {
    type: PockerHandAction;
    payload: PockerHand;
  };
}
