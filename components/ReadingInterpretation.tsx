import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ReadingInterpretationProps = {
  interpretation: string;
};

const ReadingInterpretation: React.FC<ReadingInterpretationProps> = ({
  interpretation,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reading Interpretation</Text>
      <Text style={styles.text}>{interpretation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
});

export default ReadingInterpretation;
