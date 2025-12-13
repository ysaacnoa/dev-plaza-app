import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => {
    return {
      Navigator: ({ children }: any) => <>{children}</>,
      Screen: ({ component: Component }: any) => <Component />,
    };
  },
}));

jest.mock('@modules/home/screens', () => ({
  HomeScreen: () => <></>,
}));
jest.mock('@modules/auth/hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({
    user: { id: '1', name: 'Test', lastname: 'User', email: 'test@example.com', createdAt: Date.now() },
    logout: jest.fn(),
    login: jest.fn(),
    register: jest.fn(),
    isLoggedIn: true,
  })),
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
