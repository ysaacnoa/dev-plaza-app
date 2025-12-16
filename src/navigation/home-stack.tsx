import {
  createStackNavigator,
  StackHeaderProps,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreen } from '@modules/home';
import { Icon } from '@shared/components';
import { Header, theme } from 'react-native-hooks';
import { MovementsScreen } from '@modules/movements';
import { ServicesScreen } from '@modules/services';
import { CreditCardScreen } from '@modules/credit-card';
import { LoansScreen } from '@modules/loans';
import { ServiceDetailScreen } from '@modules/services/components/service-detail';
import {
  ServiceItem,
  SERVICES_DATA,
} from '@modules/services/constants/services.constants';
import {
  FIXED_ICONS,
  FIXED_TITLES,
  HomeStackParamList,
} from './constants/navigation.constants';

const Stack = createStackNavigator<HomeStackParamList>();

function getCanGoBack(routeName: keyof HomeStackParamList): boolean {
  return routeName !== 'Home';
}

function renderDefaultHeader(
  props: StackHeaderProps,
  routeName: 'Home' | 'Cards' | 'Movements' | 'Loans' | 'Services',
  paddingTop: number,
) {
  const canGoBack = getCanGoBack(routeName);

  return (
    <Header
      {...props}
      title={FIXED_TITLES[routeName]}
      iconBackChild={
        canGoBack && (
          <Icon name="arrow-back" size={24} color={theme.colors.primary} />
        )
      }
      iconChild={
        <Icon
          name={FIXED_ICONS[routeName] ?? 'information-circle'}
          size={24}
          color={theme.colors.primary}
        />
      }
      paddingTop={paddingTop}
      canGoBack={canGoBack}
      onBackPress={canGoBack ? props.navigation.goBack : undefined}
    />
  );
}

function renderDynamicHeader(
  props: StackHeaderProps,
  routeName: keyof HomeStackParamList,
  navigation: StackNavigationProp<HomeStackParamList, 'ServiceDetail'>,
  service: ServiceItem,
  paddingTop: number,
) {
  return (
    <Header
      {...props}
      title={service.title}
      iconBackChild={
        <Icon name="arrow-back" size={24} color={theme.colors.primary} />
      }
      iconChild={
        <Icon name={service.icon} size={24} color={theme.colors.primary} />
      }
      paddingTop={paddingTop}
      canGoBack={true}
      onBackPress={() => navigation.goBack()}
    />
  );
}

export function HomeStack() {
  const insets = useSafeAreaInsets();

  const defaultScreenOptions: StackNavigationOptions = {
    cardStyle: { backgroundColor: 'white' },
    header: props => {
      const routeName = props.route.name as
        | 'Home'
        | 'Cards'
        | 'Movements'
        | 'Loans'
        | 'Services';
      return renderDefaultHeader(props, routeName, insets.top);
    },
  };

  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Cards" component={CreditCardScreen} />
      <Stack.Screen name="Movements" component={MovementsScreen} />
      <Stack.Screen name="Loans" component={LoansScreen} />
      <Stack.Screen name="Services" component={ServicesScreen} />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetailScreen}
        options={({ route, navigation }) => {
          const { serviceId } = route.params;

          const service = SERVICES_DATA.flatMap(section => section.data).find(
            s => s.id === serviceId,
          )!;

          return {
            header: props =>
              renderDynamicHeader(
                props,
                route.name,
                navigation,
                service,
                insets.top,
              ),
          };
        }}
      />
    </Stack.Navigator>
  );
}
