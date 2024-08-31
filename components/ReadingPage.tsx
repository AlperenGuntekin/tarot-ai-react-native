import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import CardSlider from '../components/CardSlider';
import BackButton from '../components/BackButton';
import { Card, Reading } from '../types';
import { shuffleDeck } from '../utils/tarotUtils';
import LoadingScreen from './LoadingScreen';

const ReadingPage: React.FC<{
  questionType: string;
  setQuestionType: (type: string | null) => void;
}> = ({ questionType, setQuestionType }) => {
  const [deck, setDeck] = useState<Card[]>(shuffleDeck());
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [reading, setReading] = useState<Reading | null>(null);
  const [isSelecting, setIsSelecting] = useState(true);
  const [showMore, setShowMore] = useState<{ [key: string]: boolean }>({});
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
    field: 'birthDate' | 'birthTime' | 'birthPlace',
    value: string
  ) => {
    setBirthChartInfo((prev) => {
      if (!prev) {
        return {
          birthDate: '',
          birthTime: '',
          birthPlace: '',
          [field]: value,
        };
      }

      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const toggleShowMore = (cardName: string) => {
    setShowMore((prev) => ({
      ...prev,
      [cardName]: !prev[cardName],
    }));
  };

  const performReading = async () => {
    setIsLoading(true);
    if (
      (questionType === 'yesNo' &&
        selectedCards.length === 1 &&
        yesNoQuestion) ||
      (selectedCards.length === 3 && questionType)
    ) {
      try {
        const response = await fetch(
          `https://www.ai-tarot.online/api/getReading`,
          {
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
          }
        );

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
        console.error('Failed to get the interpretation from OpenAI', error);
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
    setSpecificQuestion('');
    setYesNoQuestion('');
    setBirthChartInfo(null);
    setQuestionType(null);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView>
      <BackButton onPress={() => setQuestionType(null)} />
      <View style={styles.container}>
        {!questionType ? (
          <>
            <View style={styles.optionButton}>
              <Text style={styles.optionButtonText}>
                Choose your type of reading:
              </Text>
            </View>

            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => setQuestionType('general')}
              >
                <Text style={styles.optionButtonText}>General Reading</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => setQuestionType('specific')}
              >
                <Text style={styles.optionButtonText}>Specific Question</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => setQuestionType('yesNo')}
              >
                <Text style={styles.optionButtonText}>Yes or No Tarot</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => setQuestionType('birthChart')}
              >
                <Text style={styles.optionButtonText}>
                  Based on Birth Chart
                </Text>
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
                onChangeText={(text) => setYesNoQuestion(text)}
              />
            )}
            {questionType === 'specific' && (
              <TextInput
                style={styles.textField}
                placeholder="Enter your specific question"
                value={specificQuestion}
                onChangeText={(text) => setSpecificQuestion(text)}
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
        ) : (
          <View style={styles.readingContainer}>
            <View style={styles.selectedCardsContainer}></View>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
    marginBottom: 10,
    width: '48%',
  },
  optionButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  textField: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  readingContainer: {
    marginTop: 20,
  },
  selectedCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  selectedCard: {
    width: '48%',
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
  interpretationContainer: {
    marginTop: 20,
  },
  interpretationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  interpretation: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default ReadingPage;
