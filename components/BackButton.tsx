import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const BackButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.backButton} onPress={onPress}>
      <Text style={styles.backButtonText}>Back</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
  },
});

export default BackButton;
