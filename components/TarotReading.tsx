import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CardSlider from './CardSlider';
import { Card } from '@/types';
import deck from '../data/deck.json';
import ReadingPage from './ReadingPage';

const TarotReading: React.FC = () => {
  const [questionType, setQuestionType] = useState<string | null>(null);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);

  const selectQuestionType = (type: string) => {
    setQuestionType(type);
  };

  const handleCardClick = (card: Card) => {
    setSelectedCards((prevSelectedCards) => {
      if (prevSelectedCards.includes(card)) {
        return prevSelectedCards.filter((c) => c.name !== card.name);
      } else {
        return [...prevSelectedCards, card];
      }
    });
  };

  const getTitle = () => {
    switch (questionType) {
      case 'general':
        return 'General Tarot Reading';
      case 'specific':
        return 'Specific Question Tarot Reading';
      case 'yesNo':
        return 'Yes/No Tarot Reading';
      case 'birthChart':
        return 'Birth Chart Tarot Reading';
      default:
        return 'Tarot Reading';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{getTitle()}</Text>
      {questionType ? (
        <ReadingPage
          questionType={questionType}
          setQuestionType={setQuestionType}
        />
      ) : (
        <>
          <Text style={styles.instruction}>Choose your type of reading:</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => selectQuestionType('general')}
            >
              <Text style={styles.optionButtonText}>General Reading</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => selectQuestionType('specific')}
            >
              <Text style={styles.optionButtonText}>Specific Question</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => selectQuestionType('yesNo')}
            >
              <Text style={styles.optionButtonText}>Yes or No Tarot</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => selectQuestionType('birthChart')}
            >
              <Text style={styles.optionButtonText}>Based on Birth Chart</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '48%',
  },
  optionButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  selectedType: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TarotReading;
