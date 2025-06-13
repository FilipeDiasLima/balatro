import { GameRoundProps } from "@/interfaces/game";

export const initialGameRound: GameRoundProps = {
  ante: 1,
  deck: "red",
  round: 0,
  discards: 4,
  money: 10,
  hands: 4,
  discardedCards: [],
  blindSelected: null,
};

export function reducerGameRound(
  state: GameRoundProps,
  action: { type: string; payload?: Partial<GameRoundProps> },
): GameRoundProps {
  switch (action.type) {
    case "START":
      return {
        ...state,
        round: 1,
        ante: 0,
        discards: 4,
        hands: 4,
        blindSelected: null,
      };
    case "NEXT_ROUND":
      return {
        ...state,
        round: state.round + 1,
        blindSelected: action.payload?.blindSelected,
      };
    case "END_ROUND":
      return {
        ...state,
        discards: 4,
        hands: 4,
        ante: state.ante + 1,
        blindSelected: null,
      };
    case "UPDATE_DECK":
      return {
        ...state,
        deck: action.payload?.deck || state.deck,
      };
    case "UPDATE_DISCARDS":
      return {
        ...state,
        discardedCards: action.payload?.discardedCards || state.discardedCards,
        discards: action.payload?.discards ?? state.discards,
      };
    case "UPDATE_HANDS":
      return {
        ...state,
        hands: action.payload?.hands || state.hands,
      };
    default:
      return state;
  }
}
