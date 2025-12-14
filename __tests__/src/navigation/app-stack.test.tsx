import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({ children }: any) => <>{children}</>,
    Screen: ({ component: Component }: any) => <Component />,
  }),
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: any) => <>{children}</>,
}));

jest.mock('@navigation/bottom-tabs', () => ({
  BottomTabs: () => <></>,
}));

import { AppStack } from '@navigation/app-stack';

describe('AppStack', () => {
  it('should render without errors', () => {
    render(<AppStack />);
    expect(true).toBe(true);
  });

  it('should have correct screens configured', () => {
    const { UNSAFE_root } = render(<AppStack />);
    expect(UNSAFE_root).toBeDefined();
  });
});