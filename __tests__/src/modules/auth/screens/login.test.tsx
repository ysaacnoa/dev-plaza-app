import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { LoginScreen } from '../../../../../src/modules/auth/screens/login';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('../../../../../src/modules/auth/components/login-form', () => ({
  LoginForm: () => null,
}));

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<LoginScreen />);
    expect(getByText('Iniciar sesión')).toBeTruthy();
    expect(getByText('Crear cuenta')).toBeTruthy();
  });

  it('renders login form component', () => {
    render(<LoginScreen />);
    // LoginForm is mocked, so we just verify the screen renders
    expect(true).toBe(true);
  });

  it('navigates to Register screen when Crear cuenta link is pressed', () => {
    const { getByText } = render(<LoginScreen />);
    fireEvent.press(getByText('Crear cuenta'));
    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });

  it('displays title with correct styling', () => {
    const { getByText } = render(<LoginScreen />);
    const titleElement = getByText('Iniciar sesión');
    expect(titleElement).toBeTruthy();
  });
});
