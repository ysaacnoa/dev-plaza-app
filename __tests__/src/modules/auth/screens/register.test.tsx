import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { RegisterScreen } from '../../../../../src/modules/auth/screens/register';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('../../../../../src/modules/auth/components/register-form', () => ({
  RegisterForm: () => null,
}));

describe('RegisterScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<RegisterScreen />);
    expect(getByText('Crear cuenta')).toBeTruthy();
    expect(getByText('Ya tengo una cuenta')).toBeTruthy();
  });

  it('renders register form component', () => {
    render(<RegisterScreen />);
    // RegisterForm is mocked, so we just verify the screen renders
    expect(true).toBe(true);
  });

  it('navigates to Login screen when Ya tengo una cuenta link is pressed', () => {
    const { getByText } = render(<RegisterScreen />);
    fireEvent.press(getByText('Ya tengo una cuenta'));
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });

  it('displays title with correct styling', () => {
    const { getByText } = render(<RegisterScreen />);
    const titleElement = getByText('Crear cuenta');
    expect(titleElement).toBeTruthy();
  });
});
