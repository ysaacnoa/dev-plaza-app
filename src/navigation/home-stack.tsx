import {
  createStackNavigator,
  StackHeaderProps,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreen } from '@modules/home';
import { Icon, IconName } from '@shared/components';
import { Header, theme } from 'react-native-hooks';
import { MovementsScreen } from '@modules/movements';
import { ServicesScreen } from '@modules/services';
import { CreditCardScreen } from '@modules/credit-card';
import { LoansScreen } from '@modules/loans';

export type HomeStackParamList = {
  Home: undefined;
  Cards: undefined;
  Movements: undefined;
  Loans: undefined;
  Services: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

const mainScreens: (keyof HomeStackParamList)[] = ['Home'];

const renderHeader = (
  props: StackHeaderProps,
  route: { name: keyof HomeStackParamList },
  paddingTop: number,
) => {
  const canGoBack = !mainScreens.includes(route.name);

  return (
    <Header
      {...props}
      title={getScreenTitle(route.name)}
      iconBackChild={
        <Icon name="arrow-back" size={24} color={theme.colors.primary} />
      }
      iconChild={
        <Icon
          name={getScreenIcon(route.name)}
          size={24}
          color={theme.colors.primary}
        />
      }
      paddingTop={paddingTop}
      canGoBack={canGoBack}
      onBackPress={canGoBack ? props.navigation.goBack : undefined}
    />
  );
};

export function HomeStack() {
  const insets = useSafeAreaInsets();

  const screenOptions: StackNavigationOptions = {
    cardStyle: { backgroundColor: 'white' },
  };

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        ...screenOptions,
        header: props =>
          renderHeader(
            props,
            route as { name: keyof HomeStackParamList },
            insets.top,
          ),
      })}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Cards" component={CreditCardScreen} />
      <Stack.Screen name="Movements" component={MovementsScreen} />
      <Stack.Screen name="Loans" component={LoansScreen} />
      <Stack.Screen name="Services" component={ServicesScreen} />
    </Stack.Navigator>
  );
}

function getScreenTitle(routeName: keyof HomeStackParamList): string {
  const titles: Record<keyof HomeStackParamList, string> = {
    Home: 'Inicio',
    Cards: 'Tarjetas',
    Movements: 'Movimientos',
    Loans: 'Préstamos',
    Services: 'Servicios',
  };
  return titles[routeName];
}

function getScreenIcon(routeName: keyof HomeStackParamList): IconName {
  const icons: Record<keyof HomeStackParamList, IconName> = {
    Home: 'home',
    Cards: 'card',
    Movements: 'swap-horizontal',
    Loans: 'cash',
    Services: 'settings',
  };
  return icons[routeName];
}
