import { Card } from '@/types';
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

type SelectedCardsProps = {
  selectedCards: Card[];
};

const SelectedCards: React.FC<SelectedCardsProps> = ({ selectedCards }) => {
  return (
    <ScrollView style={styles.selectedCardsContainer}>
      {selectedCards.map((card) => (
        <View key={card.name} style={styles.selectedCard}>
          <Image
            source={{ uri: card.img }}
            style={[styles.cardImage, card.isReversed && styles.reversed]}
          />
          <View style={styles.cardDetails}>
            <Text style={styles.cardName}>{card.name}</Text>
            <Text style={styles.cardInfo}>
              {card.arcana}, {card.suit ? `${card.suit}, ` : ''}Number:{' '}
              {card.number}
            </Text>
            <Text style={styles.cardDescription}>{card.description}</Text>
            <Text style={styles.cardInterpretation}>
              {card.isReversed
                ? card.interpretation.reversed
                : card.interpretation.upright}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  selectedCardsContainer: {
    padding: 16,
  },
  selectedCard: {
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  reversed: {
    transform: [{ rotate: '180deg' }],
  },
  cardDetails: {
    marginTop: 10,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardInfo: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
  cardInterpretation: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default SelectedCards;
