export interface Card {
  name: string;
  number: string;
  arcana: string;
  suit: string | null;
  img: string;
  description: string;
  interpretation: {
    upright: string;
    reversed: string;
  };
  isReversed?: boolean;
}

export interface Reading {
  cards: Card[];
  interpretation: string;
}
