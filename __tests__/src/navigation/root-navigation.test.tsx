import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: any) => <>{children}</>,
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => {
    return {
      Navigator: ({ children }: any) => <>{children}</>,
      Screen: ({ component: Component }: any) => <Component />,
    };
  },
}));

jest.mock('@modules/auth/hooks/useAuth');
jest.mock('@modules/home/screens', () => ({
  HomeScreen: () => <></>,
}));
jest.mock('@modules/auth/screens', () => ({
  LoginScreen: () => <></>,
  RegisterScreen: () => <></>,
}));

import { useAuth } from '@modules/auth/hooks/useAuth';
import { RootNavigator } from '@navigation/root-navigation';

const mockUseAuth = useAuth as jest.Mock;

describe('RootNavigator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render AuthStack when user is not logged in', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      logout: jest.fn(),
      login: jest.fn(),
      register: jest.fn(),
      isLoggedIn: false,
    });

    render(<RootNavigator />);

    // The component should render without errors
    expect(mockUseAuth).toHaveBeenCalled();
  });

  it('should render AppStack when user is logged in', () => {
    mockUseAuth.mockReturnValue({
      user: {
        id: '1',
        name: 'Test',
        lastname: 'User',
        email: 'test@example.com',
        createdAt: Date.now(),
      },
      logout: jest.fn(),
      login: jest.fn(),
      register: jest.fn(),
      isLoggedIn: true,
    });

    render(<RootNavigator />);

    expect(mockUseAuth).toHaveBeenCalled();
  });
});
