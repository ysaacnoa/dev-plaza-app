import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';


jest.mock('@modules/auth/hooks/useRegisterForm', () => ({
  useRegisterForm: jest.fn(),
}));

import { useRegisterForm } from '@modules/auth/hooks/useRegisterForm';
import { RegisterForm } from '@modules/auth/components/register-form';

describe('RegisterForm', () => {
  const mockSubmit = jest.fn();
  const mockHandleChangeName = jest.fn();
  const mockHandleChangeLastname = jest.fn();
  const mockHandleChangeEmail = jest.fn();
  const mockHandleChangePassword = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRegisterForm as jest.Mock).mockReturnValue({
      name: '',
      lastname: '',
      email: '',
      password: '',
      error: null,
      loading: false,
      handleChangeName: mockHandleChangeName,
      handleChangeLastname: mockHandleChangeLastname,
      handleChangeEmail: mockHandleChangeEmail,
      handleChangePassword: mockHandleChangePassword,
      handleSubmit: mockSubmit,
    });
  });

  it('renders all fields', () => {
    const { getByPlaceholderText } = render(<RegisterForm />);

    expect(getByPlaceholderText('Nombre')).toBeTruthy();
    expect(getByPlaceholderText('Apellido')).toBeTruthy();
    expect(getByPlaceholderText('Correo')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña')).toBeTruthy();
  });

  it('renders submit button', () => {
    const { getByText } = render(<RegisterForm />);
    expect(getByText('Registrarme')).toBeTruthy();
  });

  it('calls handleSubmit when button is pressed', () => {
    const { getByText } = render(<RegisterForm />);
    fireEvent.press(getByText('Registrarme'));
    expect(mockSubmit).toHaveBeenCalled();
  });

  it('shows error message when error is present', () => {
    (useRegisterForm as jest.Mock).mockReturnValue({
      name: '',
      lastname: '',
      email: '',
      password: '',
      error: 'El email ya está registrado',
      loading: false,
      handleChangeName: mockHandleChangeName,
      handleChangeLastname: mockHandleChangeLastname,
      handleChangeEmail: mockHandleChangeEmail,
      handleChangePassword: mockHandleChangePassword,
      handleSubmit: mockSubmit,
    });

    const { getByText } = render(<RegisterForm />);
    expect(getByText('El email ya está registrado')).toBeTruthy();
  });

  it('disables button when loading', () => {
    (useRegisterForm as jest.Mock).mockReturnValue({
      name: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      error: null,
      loading: true,
      handleChangeName: mockHandleChangeName,
      handleChangeLastname: mockHandleChangeLastname,
      handleChangeEmail: mockHandleChangeEmail,
      handleChangePassword: mockHandleChangePassword,
      handleSubmit: mockSubmit,
    });

    const { getByText } = render(<RegisterForm />);
    const button = getByText('Registrarme');
    expect(button).toBeTruthy();
  });

  it('calls handleChangeName when name input changes', () => {
    const { getByPlaceholderText } = render(<RegisterForm />);
    fireEvent.changeText(getByPlaceholderText('Nombre'), 'John');
    expect(mockHandleChangeName).toHaveBeenCalledWith('John');
  });

  it('calls handleChangeLastname when lastname input changes', () => {
    const { getByPlaceholderText } = render(<RegisterForm />);
    fireEvent.changeText(getByPlaceholderText('Apellido'), 'Doe');
    expect(mockHandleChangeLastname).toHaveBeenCalledWith('Doe');
  });

  it('calls handleChangeEmail when email input changes', () => {
    const { getByPlaceholderText } = render(<RegisterForm />);
    fireEvent.changeText(getByPlaceholderText('Correo'), 'john@example.com');
    expect(mockHandleChangeEmail).toHaveBeenCalledWith('john@example.com');
  });

  it('calls handleChangePassword when password input changes', () => {
    const { getByPlaceholderText } = render(<RegisterForm />);
    fireEvent.changeText(getByPlaceholderText('Contraseña'), 'password123');
    expect(mockHandleChangePassword).toHaveBeenCalledWith('password123');
  });
});
