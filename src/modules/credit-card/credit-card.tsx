import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { theme } from 'react-native-hooks';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 0.7;

const cards = [
  {
    id: '1',
    image: require('@assets/images/cards/bank-card-01.png'),
    name: 'Tarjeta Principal',
  },
  {
    id: '2',
    image: require('@assets/images/cards/bank-card-02.png'),
    name: 'Tarjeta Secundaria',
  },
  {
    id: '3',
    image: require('@assets/images/cards/bank-card-03.png'),
    name: 'Tarjeta Adicional',
  },
];

export function CreditCardScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.cardsList}>
        {cards.map(card => (
          <View key={card.id} style={styles.cardContainer}>
            <Image
              source={card.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  content: {
    padding: theme.spacing.xl,
  },
  cardsList: {
    width: '100%',
    alignItems: 'center',
  },
  cardContainer: {
    width: CARD_WIDTH,
  },
  cardImage: {
    width: '100%',
    height: CARD_HEIGHT,
  },
});
