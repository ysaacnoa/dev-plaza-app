import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useAuth } from '@modules/auth/hooks/useAuth';
import { Alert, Linking } from 'react-native';
import { SettingsScreen } from '@modules/settings';

jest.mock('@modules/auth/hooks/useAuth');
jest.mock('react-native-hooks', () => ({
  theme: {
    colors: {
      primary: '#007AFF',
      text: '#000',
      textMuted: '#8E8E93',
      grayLight: '#D1D1D6',
    },
    typography: {
      body: { fontSize: 14, fontWeight: '400' },
      title: { fontSize: 16, fontWeight: '600' },
      caption: { fontSize: 12, fontWeight: '400' },
    },
    spacing: { xs: 4, sm: 8, lg: 16, xl: 24 },
  },
}));

describe('SettingsScreen', () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
      loading: false,
    });
    jest.clearAllMocks();
  });

  it('renders all setting items', () => {
    const { getByTestId } = render(<SettingsScreen />);
    expect(getByTestId('item-security')).toBeTruthy();
    expect(getByTestId('item-configuration')).toBeTruthy();
    expect(getByTestId('item-apple-pay')).toBeTruthy();
    expect(getByTestId('item-personalize')).toBeTruthy();
  });

  it('calls Linking.openURL when phone number is pressed', () => {
    const openURLMock = jest.spyOn(Linking, 'openURL').mockResolvedValue(null);
    const { getByTestId } = render(<SettingsScreen />);
    fireEvent.press(getByTestId('phone-number'));
    expect(openURLMock).toHaveBeenCalledWith('tel:+5198273219');
  });

  it('shows alert and calls logout on confirm', async () => {
    const alertMock = jest.spyOn(Alert, 'alert').mockImplementation((title, msg, buttons) => {
      // Simular presionar "Sí, cerrar"
      buttons?.[1].onPress?.();
    });

    const { getByTestId } = render(<SettingsScreen />);
    fireEvent.press(getByTestId('logout-button'));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
      expect(mockLogout).toHaveBeenCalled();
    });
  });

  it('renders loading state text correctly', () => {
    (useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
      loading: true,
    });

    const { getByTestId } = render(<SettingsScreen />);
    const text = getByTestId('logout-text');

    expect(text.props.children).toBe('Cerrando sesión...');
  });
});
