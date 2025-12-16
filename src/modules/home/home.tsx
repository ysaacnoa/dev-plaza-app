import { useAuth } from '@modules/auth/hooks/useAuth';
import { Grid, WelcomeSection } from '@modules/home/components';
import { HomeStackParamList } from '@navigation/constants/navigation.constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IconName } from '@shared/components';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Carousel, theme } from 'react-native-hooks';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;

interface Card {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  onPress: () => void;
}

export function HomeScreen() {
  const { user } = useAuth();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const cards: Card[] = [
    {
      id: '1',
      title: 'Tarjetas',
      description: 'Se listarán tus tarjetas de crédito y débito',
      icon: 'card',
      onPress: () => navigation.navigate('Cards'),
    },
    {
      id: '2',
      title: 'Movimientos',
      description: 'Aquí verás todos tus movimientos',
      icon: 'swap-horizontal',
      onPress: () => navigation.navigate('Movements'),
    },
    {
      id: '3',
      title: 'Préstamos',
      description: 'Descubre los préstamos que tenemos para ti',
      icon: 'cash',
      onPress: () => navigation.navigate('Loans'),
    },
    {
      id: '4',
      title: 'Servicios',
      description: 'Aquí podrás pagar todos tus servicios',
      icon: 'settings',
      onPress: () => navigation.navigate('Services'),
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      testID="home-scrollview"
    >
      <WelcomeSection userName={user?.name} />

      <View style={styles.section} testID="cards-section">
        <Grid services={cards} />
      </View>

      <View style={styles.section} testID="recent-section">
        <Text style={styles.sectionTitle} testID="recent-title">
          Lo más reciente
        </Text>
        <View style={styles.carouselContainer}>
          <Carousel
            testID="banner-carousel"
            data={[
              {
                id: '1',
                localSource: require('@assets/images/carousel/nestJS.webp'),
                url: 'https://via.placeholder.com/300x150',
              },
              {
                id: '2',
                localSource: require('@assets/images/carousel/Pnpm.webp'),
                url: 'https://via.placeholder.com/300x150',
              },
              {
                id: '3',
                localSource: require('@assets/images/carousel/ReactNative.png'),
                url: 'https://via.placeholder.com/300x150',
              },
            ]}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  section: {
    paddingHorizontal: theme.spacing.lg,
  },
  carouselContainer: {
    width: '100%',
    marginTop: 30,
    height: 200,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: theme.spacing.lg,
  },
});
