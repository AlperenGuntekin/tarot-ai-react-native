import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type QuestionTypeSelectorProps = {
  selectQuestionType: (type: string) => void;
};

const QuestionTypeSelector: React.FC<QuestionTypeSelectorProps> = ({
  selectQuestionType,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.instruction}>Choose your type of reading:</Text>
      <View style={styles.optionsContainer}>
        {['Love', 'Money', 'General', 'Specific', 'BirthChart', 'YesNo'].map(
          (type) => (
            <TouchableOpacity
              key={type}
              style={styles.optionButton}
              onPress={() => selectQuestionType(type.toLowerCase())}
            >
              <Text style={styles.optionButtonText}>{type} Reading</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 10,
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
});

export default QuestionTypeSelector;
