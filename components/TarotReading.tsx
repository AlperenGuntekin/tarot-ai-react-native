import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import CardSlider from '@/components/CardSlider';
import { Card, Reading } from '@/types';
import { shuffleDeck } from '@/utils/deck';

const TarotReading: React.FC = () => {
  const [deck, setDeck] = useState<Card[]>(shuffleDeck());
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [reading, setReading] = useState<Reading | null>(null);
  const [isSelecting, setIsSelecting] = useState(true);
  const [showMore, setShowMore] = useState<{ [key: string]: boolean }>({});
  const [questionType, setQuestionType] = useState<string | null>(null);
  const [specificQuestion, setSpecificQuestion] = useState<string>('');
  const [yesNoQuestion, setYesNoQuestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [birthChartInfo, setBirthChartInfo] = useState<{
    birthDate: string;
    birthTime: string;
    birthPlace: string;
  } | null>(null);

  const handleCardClick = (card: Card) => {
    if (questionType === 'yesNo' && selectedCards.length === 1) {
      return;
    }
    if (selectedCards.length < 3 && !selectedCards.includes(card)) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleBirthChartInfoChange = (
    field: keyof NonNullable<typeof birthChartInfo>,
    value: string
  ) => {
    setBirthChartInfo((prev) => {
      if (prev === null) {
        return { birthDate: '', birthTime: '', birthPlace: '', [field]: value };
      } else {
        return {
          ...prev,
          [field]: value,
        };
      }
    });
  };

  const toggleShowMore = (cardName: string) => {
    setShowMore((prev) => ({
      ...prev,
      [cardName]: !prev[cardName],
    }));
  };

  const performReading = async () => {
    if (
      (questionType === 'yesNo' &&
        selectedCards.length === 1 &&
        yesNoQuestion) ||
      (selectedCards.length === 3 && questionType)
    ) {
      setIsLoading(true);
      try {
        // API çağrısı yapılacak
        // Örnek API URL'si kullanılıyor
        const response = await fetch('https://example.com/api/getReading', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            questionType,
            selectedCards,
            question:
              questionType === 'yesNo' ? yesNoQuestion : specificQuestion,
            birthChartInfo,
          }),
        });

        const data = await response.json();
        if (questionType === 'yesNo') {
          const answer = selectedCards[0].isReversed ? 'No' : 'Yes';
          setReading({
            cards: selectedCards,
            interpretation: `The answer to your question "${yesNoQuestion}" is: ${answer}`,
          });
        } else {
          setReading({
            cards: selectedCards,
            interpretation: data.interpretation,
          });
        }
        setIsSelecting(false);
      } catch (error) {
        console.error('Failed to get the interpretation', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetReading = () => {
    setDeck(shuffleDeck());
    setSelectedCards([]);
    setReading(null);
    setIsSelecting(true);
    setQuestionType(null);
    setSpecificQuestion('');
    setYesNoQuestion('');
    setBirthChartInfo(null);
  };

  const selectQuestionType = (type: string) => {
    setQuestionType(type);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tarot Reading</Text>
      {!questionType ? (
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
      ) : isSelecting ? (
        <>
          <Text style={styles.instruction}>
            {questionType === 'yesNo'
              ? 'Ask your yes/no question and select one card'
              : 'Select three cards for your reading'}
          </Text>
          {questionType === 'yesNo' && (
            <TextInput
              style={styles.textField}
              placeholder="Enter your yes/no question"
              value={yesNoQuestion}
              onChangeText={setYesNoQuestion}
            />
          )}
          {questionType === 'specific' && (
            <TextInput
              style={styles.textField}
              placeholder="Enter your specific question"
              value={specificQuestion}
              onChangeText={setSpecificQuestion}
            />
          )}
          {questionType === 'birthChart' && (
            <>
              <TextInput
                style={styles.textField}
                placeholder="Enter your birth date (YYYY-MM-DD)"
                onChangeText={(text) =>
                  handleBirthChartInfoChange('birthDate', text)
                }
              />
              <TextInput
                style={styles.textField}
                placeholder="Enter your birth time (HH:MM)"
                onChangeText={(text) =>
                  handleBirthChartInfoChange('birthTime', text)
                }
              />
              <TextInput
                style={styles.textField}
                placeholder="Enter your birth place"
                onChangeText={(text) =>
                  handleBirthChartInfoChange('birthPlace', text)
                }
              />
            </>
          )}

          <CardSlider
            deck={deck}
            selectedCards={selectedCards}
            handleCardClick={handleCardClick}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={performReading}
            disabled={
              isLoading ||
              (questionType === 'yesNo'
                ? !yesNoQuestion || selectedCards.length !== 1
                : selectedCards.length !== 3)
            }
          >
            <Text style={styles.buttonText}>Interpret Reading</Text>
          </TouchableOpacity>
        </>
      ) : isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <View style={styles.readingContainer}>
          <View style={styles.selectedCardsContainer}>
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
                  <Text style={styles.cardDescription}>
                    {showMore[card.name]
                      ? card.description
                      : `${card.description.slice(0, 100)}...`}
                    {card.description.length > 100 && (
                      <Text
                        style={styles.readMoreButton}
                        onPress={() => toggleShowMore(card.name)}
                      >
                        {showMore[card.name] ? 'Show Less' : 'Read More'}
                      </Text>
                    )}
                  </Text>
                  <Text style={styles.cardInterpretation}>
                    {card.isReversed
                      ? card.interpretation.reversed
                      : card.interpretation.upright}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          {reading && (
            <View style={styles.interpretationContainer}>
              <Text style={styles.interpretationTitle}>
                Reading Interpretation
              </Text>
              <Text style={styles.interpretation}>
                {reading.interpretation}
              </Text>
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={resetReading}>
            <Text style={styles.buttonText}>New Reading</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
  },
  textField: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedCard: {
    flex: 1,
    marginHorizontal: 5,
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
  readMoreButton: {
    color: '#007bff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  interpretationContainer: {
    marginTop: 20,
  },
  interpretationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  interpretation: {
    fontSize: 16,
    color: '#555',
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
  readingContainer: {
    marginTop: 20,
  },
});

export default TarotReading;
