import { Card } from '@/types';
import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

type CardSliderProps = {
  deck: Card[];
  selectedCards: Card[];
  handleCardClick: (card: Card) => void;
};

const { width: screenWidth } = Dimensions.get('window');

const CardSlider: React.FC<CardSliderProps> = ({
  deck,
  selectedCards,
  handleCardClick,
}) => {
  const renderItem = ({ item }: { item: Card }) => {
    const isSelected = selectedCards.includes(item);
    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selected]}
        onPress={() => handleCardClick(item)}
      >
        <View style={styles.cardInner}>
          <Image
            source={require('../assets/images/cards/card-back.png')}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Image
            source={{ uri: item.img }}
            style={[styles.cardImage, item.isReversed && styles.reversed]}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Carousel
      data={deck}
      renderItem={renderItem}
      sliderWidth={screenWidth}
      itemWidth={100}
      inactiveSlideScale={0.8}
      inactiveSlideOpacity={0.7}
      enableMomentum
      activeSlideAlignment="center"
      containerCustomStyle={styles.carouselContainer}
      contentContainerCustomStyle={styles.carouselContentContainer}
      layout="default"
    />
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    // Stil ayarları
  },
  carouselContentContainer: {
    // Stil ayarları
  },
  card: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // Diğer stil ayarları
  },
  selected: {
    borderColor: '#007bff',
    borderWidth: 2,
    borderRadius: 10,
  },
  cardInner: {
    // Stil ayarları
    position: 'relative',
  },
  cardImage: {
    width: 80,
    height: 120,
  },
  reversed: {
    transform: [{ rotate: '180deg' }],
  },
});

export default CardSlider;
