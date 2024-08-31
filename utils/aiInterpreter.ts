import { Card, Reading } from '../types';

export const interpretReading = (cards: Card[]): Reading => {
  const interpretation = `This is a basic interpretation of your ${
    cards.length
  }-card spread. 
    ${cards
      .map((card) => `The ${card.name} suggests ${card.description}.`)
      .join(' ')}
    Consider how these energies might be influencing your current situation.`;

  return { cards, interpretation };
};
