import { useAuth } from '@modules/auth/hooks/useAuth';
import { Grid, WelcomeSection, type IconName } from '@modules/home/components';
import { HomeStackParamList } from '@navigation/home-stack';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BannerCarousel, theme } from 'react-native-hooks';

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
        <BannerCarousel
          testID="banner-carousel"
          banners={[
            {
              id: '1',
              image:
                'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fwh08k610469i6eao2w81.jpeg',
              url: 'https://via.placeholder.com/300x150',
            },
            {
              id: '2',
              image:
                'https://www.inovex.de/wp-content/uploads/2018/03/react-native-1500x880.png',
              url: 'https://via.placeholder.com/300x150',
            },
            {
              id: '3',
              image:
                'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fmcdsd800qtssxv23h1r4.png',
              url: 'https://via.placeholder.com/300x150',
            },
          ]}
        />
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
});
