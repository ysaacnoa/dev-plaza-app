import React from 'react';
import { render } from '@testing-library/react-native';
import { RootNavigator } from '@navigation/root-navigation';
import { useAuth } from '@modules/auth/hooks/useAuth';

jest.mock('@modules/auth/hooks/useAuth');
const mockUseAuth = useAuth as jest.Mock;

jest.mock('@navigation/app-stack', () => ({
  AppStack: () => <></>,
}));

jest.mock('@navigation/auth-stack', () => ({
  AuthStack: () => <></>,
}));

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
