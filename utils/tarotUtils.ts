import { Card, Reading } from '../types';
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

export const interpretReading = (cards: Card[]): Reading => {
  const positions = ['Past', 'Present', 'Future'];
  let interpretation = "Here's your three-card reading:\n\n";

  cards.forEach((card, index) => {
    const position = positions[index];
    const cardInterpretation = card.isReversed
      ? card.interpretation.reversed
      : card.interpretation.upright;

    interpretation += `${position}: ${card.name} (${
      card.isReversed ? 'Reversed' : 'Upright'
    })\n`;
    interpretation += `${card.description}\n`;
    interpretation += `This card suggests: ${cardInterpretation}\n\n`;
  });

  interpretation +=
    'Remember, tarot readings are open to interpretation and should be considered as guidance rather than absolute truth.';

  return { cards, interpretation };
};
