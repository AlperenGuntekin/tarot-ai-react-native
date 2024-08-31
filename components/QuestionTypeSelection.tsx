import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface QuestionTypeSelectionProps {
  selectQuestionType: (type: string) => void;
}

const QuestionTypeSelection: React.FC<QuestionTypeSelectionProps> = ({
  selectQuestionType,
}) => {
  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
});

export default QuestionTypeSelection;
