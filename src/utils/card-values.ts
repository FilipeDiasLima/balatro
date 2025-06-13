export function getCardValue(card: string): number {
  const cardValues: { [key: string]: number } = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    Jack: 10,
    Queen: 10,
    King: 10,
    Ace: 11,
  };

  return cardValues[card] || 0;
}
