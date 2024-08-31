import { Card } from '../types';

export async function interpretReading(selectedCards: Card[]): Promise<string> {
  const response = await fetch('https://www.ai-tarot.online/api/getReading', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cards: selectedCards }),
  });

  const data = await response.json();
  return data.interpretation;
}
