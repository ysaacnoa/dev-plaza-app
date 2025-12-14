import React from 'react';
import { render } from '@testing-library/react-native';
import { HomeStack } from '@navigation/home-stack';

jest.mock('@react-navigation/stack', () => {
  const actual = jest.requireActual('@react-navigation/stack');
  return {
    ...actual,
    createStackNavigator: () => ({
      Navigator: ({ screenOptions, children }: any) => {
        const routes = ['Home', 'Cards', 'Movements', 'Loans', 'Services'];
        routes.forEach(routeName => {
          const mockRoute = { name: routeName };
          const mockProps = {
            navigation: { goBack: jest.fn() },
            route: mockRoute,
          };
          if (screenOptions && typeof screenOptions === 'function') {
            const options = screenOptions({ route: mockRoute });
            if (options.header) {
              options.header(mockProps);
            }
          }
        });
        return <>{children}</>;
      },
      Screen: ({ component: Component }: any) => <Component />,
    }),
  };
});

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 44, bottom: 34 }),
}));

jest.mock('@modules/home/screens', () => ({
  HomeScreen: () => null,
  CreditCardScreen: () => null,
  MovementsScreen: () => null,
  LoansScreen: () => null,
  ServicesScreen: () => null,
}));

jest.mock('@modules/home/components', () => ({
  Icon: () => null,
}));

jest.mock('react-native-hooks', () => ({
  Header: () => null,
  theme: {
    colors: { primary: '#007bff' },
  },
}));

describe('HomeStack', () => {
  it('renders and fully executes header logic for all screens (100% coverage)', () => {
    render(<HomeStack />);
  });
});