import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('@modules/auth/hooks/useAuth');

import { useAuth } from '@modules/auth/hooks/useAuth';
import { HomeScreen } from '@modules/home/screens/home-screen';

const mockUseAuth = useAuth as jest.Mock;

describe('HomeScreen', () => {
  const mockLogout = jest.fn();
  const mockUser = {
    id: '1',
    name: 'Test',
    lastname: 'User',
    email: 'test@example.com',
    createdAt: Date.now(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      user: mockUser,
      logout: mockLogout,
      login: jest.fn(),
      register: jest.fn(),
      isLoggedIn: true,
    });
  });

  it('renders welcome message with user name', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText(`Bienvenido, ${mockUser.name}`)).toBeTruthy();
  });

  it('renders logout button', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Cerrar sesión')).toBeTruthy();
  });

  it('calls logout when logout button is pressed', () => {
    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText('Cerrar sesión'));
    expect(mockLogout).toHaveBeenCalled();
  });
});
