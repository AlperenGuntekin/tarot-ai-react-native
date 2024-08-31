import { Card } from '../types';
import deckData from '../data/deck.json';

const deck: Card[] = deckData.cards;

export const shuffleDeck = (): Card[] => {
  return [...deck]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({
      ...card,
      isReversed: Math.random() < 0.5,
    }));
};

export const drawCards = (count: number): Card[] => {
  const shuffled = shuffleDeck();
  return shuffled.slice(0, count);
};
