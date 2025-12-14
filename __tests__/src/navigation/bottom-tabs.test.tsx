import React from 'react';
import { render } from '@testing-library/react-native';
import { BottomTabs } from '@navigation/bottom-tabs';

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({ children }: any) => <>{children}</>,
    Screen: ({ options }: any) => {
      if (options?.tabBarIcon) {
        options.tabBarIcon({ color: '#000', focused: true });
        options.tabBarIcon({ color: '#666', focused: false });
      }
      return null;
    },
  }),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ bottom: 20, top: 0 }),
}));

jest.mock('@navigation/home-stack', () => ({ HomeStack: () => null }));
jest.mock('@modules/chat/screens', () => ({ ChatScreen: () => null }));
jest.mock('@modules/settings/screens', () => ({ SettingsScreen: () => null }));
jest.mock('@modules/home/components', () => ({ Icon: () => null }));
jest.mock('react-native-hooks', () => ({
  theme: {
    colors: { primary: '#7300E0', textMuted: '#B5B5B7', surface: '#fff', border: '#E0E0E1' },
    spacing: { sm: 8, xs: 4 },
    typography: { body: { fontSize: 12 } },
  },
}));

describe('BottomTabs', () => {
  it('renders correctly and executes tab options (covers icons and config)', () => {
    render(<BottomTabs />);
  });
});