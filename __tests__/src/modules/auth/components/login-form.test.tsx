import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('@modules/auth/hooks/useLoginForm', () => ({
  useLoginForm: jest.fn(),
}));

import { useLoginForm } from '@modules/auth/hooks/useLoginForm';
import { LoginForm } from '@modules/auth/components/login-form';

describe('LoginForm', () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    (useLoginForm as jest.Mock).mockReturnValue({
      email: '',
      password: '',
      error: null,
      loading: false,
      handleChangeEmail: jest.fn(),
      handleChangePassword: jest.fn(),
      handleSubmit: mockSubmit,
    });
  });

  it('renders inputs and button', () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);

    expect(getByPlaceholderText('Correo')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña')).toBeTruthy();
    expect(getByText('Ingresar')).toBeTruthy();
  });

  it('calls submit on button press', () => {
    const { getByText } = render(<LoginForm />);

    fireEvent.press(getByText('Ingresar'));
    expect(mockSubmit).toHaveBeenCalled();
  });

  it('shows error message when error exists', () => {
    (useLoginForm as jest.Mock).mockReturnValueOnce({
      ...useLoginForm(),
      error: 'Credenciales inválidas',
    });

    const { getByText } = render(<LoginForm />);
    expect(getByText('Credenciales inválidas')).toBeTruthy();
  });
});
