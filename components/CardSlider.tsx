import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Card } from '../types';

type CardSliderProps = {
  deck: Card[];
  selectedCards: Card[];
  handleCardClick: (card: Card) => void;
};

const CardSlider: React.FC<CardSliderProps> = ({
  deck,
  selectedCards,
  handleCardClick,
}) => {
  return (
    <FlatList
      data={deck}
      horizontal
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleCardClick(item)}>
          <View style={styles.card}>
            {selectedCards.includes(item) ? (
              <Image source={images[item.img]} style={styles.cardImage} />
            ) : (
              <Image
                source={images['card-back.png']}
                style={styles.cardImage}
              />
            )}
            <Text style={styles.cardName}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  cardImage: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
  },
  cardName: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
});

const images: Record<string, any> = {
  'card-back.png': require('../assets/images/cards/card-back.png'),
  'm00.jpg': require('../assets/images/cards/m00.jpg'),
  'm01.jpg': require('../assets/images/cards/m01.jpg'),
  'm02.jpg': require('../assets/images/cards/m02.jpg'),
  'm03.jpg': require('../assets/images/cards/m03.jpg'),
  'm04.jpg': require('../assets/images/cards/m04.jpg'),
  'm05.jpg': require('../assets/images/cards/m05.jpg'),
  'm06.jpg': require('../assets/images/cards/m06.jpg'),
  'm07.jpg': require('../assets/images/cards/m07.jpg'),
  'm08.jpg': require('../assets/images/cards/m08.jpg'),
  'm09.jpg': require('../assets/images/cards/m09.jpg'),
  'm10.jpg': require('../assets/images/cards/m10.jpg'),
  'm11.jpg': require('../assets/images/cards/m11.jpg'),
  'm12.jpg': require('../assets/images/cards/m12.jpg'),
  'm13.jpg': require('../assets/images/cards/m13.jpg'),
  'm14.jpg': require('../assets/images/cards/m14.jpg'),
  'c01.jpg': require('../assets/images/cards/c01.jpg'),
  'c02.jpg': require('../assets/images/cards/c02.jpg'),
  'c03.jpg': require('../assets/images/cards/c03.jpg'),
  'c04.jpg': require('../assets/images/cards/c04.jpg'),
  'c05.jpg': require('../assets/images/cards/c05.jpg'),
  'c06.jpg': require('../assets/images/cards/c06.jpg'),
  'c07.jpg': require('../assets/images/cards/c07.jpg'),
  'c08.jpg': require('../assets/images/cards/c08.jpg'),
  'c09.jpg': require('../assets/images/cards/c09.jpg'),
  'c10.jpg': require('../assets/images/cards/c10.jpg'),
  'c11.jpg': require('../assets/images/cards/c11.jpg'),
  'c12.jpg': require('../assets/images/cards/c12.jpg'),
  'c13.jpg': require('../assets/images/cards/c13.jpg'),
  'c14.jpg': require('../assets/images/cards/c14.jpg'),
  's01.jpg': require('../assets/images/cards/s01.jpg'),
  's02.jpg': require('../assets/images/cards/s02.jpg'),
  's03.jpg': require('../assets/images/cards/s03.jpg'),
  's04.jpg': require('../assets/images/cards/s04.jpg'),
  's05.jpg': require('../assets/images/cards/s05.jpg'),
  's06.jpg': require('../assets/images/cards/s06.jpg'),
  's07.jpg': require('../assets/images/cards/s07.jpg'),
  's08.jpg': require('../assets/images/cards/s08.jpg'),
  's09.jpg': require('../assets/images/cards/s09.jpg'),
  's10.jpg': require('../assets/images/cards/s10.jpg'),
  's11.jpg': require('../assets/images/cards/s11.jpg'),
  's12.jpg': require('../assets/images/cards/s12.jpg'),
  's13.jpg': require('../assets/images/cards/s13.jpg'),
  's14.jpg': require('../assets/images/cards/s14.jpg'),
  'w01.jpg': require('../assets/images/cards/w01.jpg'),
  'w02.jpg': require('../assets/images/cards/w02.jpg'),
  'w03.jpg': require('../assets/images/cards/w03.jpg'),
  'w04.jpg': require('../assets/images/cards/w04.jpg'),
  'w05.jpg': require('../assets/images/cards/w05.jpg'),
  'w06.jpg': require('../assets/images/cards/w06.jpg'),
  'w07.jpg': require('../assets/images/cards/w07.jpg'),
  'w08.jpg': require('../assets/images/cards/w08.jpg'),
  'w09.jpg': require('../assets/images/cards/w09.jpg'),
  'w10.jpg': require('../assets/images/cards/w10.jpg'),
  'w11.jpg': require('../assets/images/cards/w11.jpg'),
  'w12.jpg': require('../assets/images/cards/w12.jpg'),
  'w13.jpg': require('../assets/images/cards/w13.jpg'),
  'w14.jpg': require('../assets/images/cards/w14.jpg'),
  'p01.jpg': require('../assets/images/cards/p01.jpg'),
  'p02.jpg': require('../assets/images/cards/p02.jpg'),
  'p03.jpg': require('../assets/images/cards/p03.jpg'),
  'p04.jpg': require('../assets/images/cards/p04.jpg'),
  'p05.jpg': require('../assets/images/cards/p05.jpg'),
  'p06.jpg': require('../assets/images/cards/p06.jpg'),
  'p07.jpg': require('../assets/images/cards/p07.jpg'),
  'p08.jpg': require('../assets/images/cards/p08.jpg'),
  'p09.jpg': require('../assets/images/cards/p09.jpg'),
  'p10.jpg': require('../assets/images/cards/p10.jpg'),
  'p11.jpg': require('../assets/images/cards/p11.jpg'),
  'p12.jpg': require('../assets/images/cards/p12.jpg'),
  'p13.jpg': require('../assets/images/cards/p13.jpg'),
  'p14.jpg': require('../assets/images/cards/p14.jpg'),
};

export default CardSlider;
