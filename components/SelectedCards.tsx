import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from '../types';

interface SelectedCardsProps {
  selectedCards: Card[];
  showMore: { [key: string]: boolean };
  toggleShowMore: (cardName: string) => void;
}

const SelectedCards: React.FC<SelectedCardsProps> = ({
  selectedCards,
  showMore,
  toggleShowMore,
}) => {
  return (
    <View style={styles.container}>
      {selectedCards.map((card) => (
        <View key={card.name} style={styles.selectedCard}>
          <Text style={styles.cardName}>{card.name}</Text>
          <Text style={styles.cardInfo}>
            {card.arcana}, {card.suit ? `${card.suit}, ` : ''}Number:{' '}
            {card.number}
          </Text>
          <Text style={styles.cardDescription}>
            {showMore[card.name]
              ? card.description
              : `${card.description.slice(0, 100)}...`}
            {card.description.length > 100 && (
              <TouchableOpacity
                style={styles.readMoreButton}
                onPress={() => toggleShowMore(card.name)}
              >
                <Text style={styles.readMoreButtonText}>
                  {showMore[card.name] ? 'Show Less' : 'Read More'}
                </Text>
              </TouchableOpacity>
            )}
          </Text>
          <Text style={styles.cardInterpretation}>
            {card.isReversed
              ? card.interpretation.reversed
              : card.interpretation.upright}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  selectedCard: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardInfo: {
    fontSize: 14,
  },
  cardDescription: {
    fontSize: 12,
    marginVertical: 8,
  },
  readMoreButton: {
    marginTop: 8,
  },
  readMoreButtonText: {
    color: '#007bff',
    fontSize: 12,
  },
  cardInterpretation: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default SelectedCards;
