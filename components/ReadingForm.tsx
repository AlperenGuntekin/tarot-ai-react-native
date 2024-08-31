import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface ReadingFormProps {
  questionType: string;
  yesNoQuestion: string;
  setYesNoQuestion: (text: string) => void;
  specificQuestion: string;
  setSpecificQuestion: (text: string) => void;
  handleBirthChartInfoChange: (
    field: 'birthDate' | 'birthTime' | 'birthPlace',
    value: string
  ) => void;
}

const ReadingForm: React.FC<ReadingFormProps> = ({
  questionType,
  yesNoQuestion,
  setYesNoQuestion,
  specificQuestion,
  setSpecificQuestion,
  handleBirthChartInfoChange,
}) => {
  return (
    <View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  textField: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
  },
});

export default ReadingForm;
