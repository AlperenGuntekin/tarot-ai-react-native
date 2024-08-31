import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  HomePage: undefined;
  TarotReading: undefined;
};

const HomePage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>
          Free In-Person & Online Tarot Card Readings
        </Text>
        <Text style={styles.subtitle}>
          Discover your destiny with our AI-powered tarot readings.
        </Text>
        <Image
          source={require('../assets/images/tarot-ai-mascot.png')}
          style={styles.mascot}
        />
      </View>
      <View style={styles.features}>
        <Feature
          title="Personalized Readings"
          image="personalized.webp"
          description="Get insights tailored to your life and questions."
        />
        <Feature
          title="Accurate Predictions"
          image="accurate.webp"
          description="Our advanced AI provides detailed and precise interpretations."
        />
        <Feature
          title="Easy to Use"
          image="easy-to-use.webp"
          description="Simple and intuitive interface for a seamless experience."
        />
      </View>
      <View style={styles.additionalLinks}>
        <Text style={styles.sectionTitle}>Learn More About Tarot</Text>
        {/* Tarot linklerini buraya ekleyin */}
      </View>
    </ScrollView>
  );
};

const Feature = ({
  title,
  image,
  description,
}: {
  title: string;
  image: string;
  description: string;
}) => (
  <View style={styles.feature}>
    <Image source={{ uri: image }} style={styles.featureImage} />
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDescription}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  hero: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  ctaButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  ctaButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  mascot: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 16,
  },
  features: {
    marginVertical: 20,
  },
  feature: {
    marginBottom: 20,
  },
  featureImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
  },
  additionalLinks: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HomePage;
