import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { HomeScreen } from '@modules/home/screens';
import { useAuth } from '@modules/auth/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

jest.mock('@modules/auth/hooks/useAuth');
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('@modules/home/components', () => {
  const { Text, TouchableOpacity } = require('react-native');
  return {
    WelcomeSection: ({ userName }: { userName?: string }) => {
      userName;
      return <></>;
    },
    Grid: ({ services }: { services: any[] }) => (
      <>
        {services.map((service: any) => (
          <TouchableOpacity
            key={service.id}
            testID={`card-${service.id}`}
            onPress={service.onPress}
          >
            <Text testID={`card-title-${service.id}`}>{service.title}</Text>
            <Text>{service.description}</Text>
          </TouchableOpacity>
        ))}
      </>
    ),
  };
});

jest.mock('react-native-hooks', () => {
  const { View } = require('react-native');
  return {
    BannerCarousel: (props: any) => (
      <View {...props} testID="banner-carousel" />
    ),
    theme: {
      colors: {
        surface: '#fff',
        text: '#000',
      },
      spacing: { lg: 16, md: 12 },
      typography: {
        title: { fontSize: 24, fontWeight: '700' },
        body: { fontSize: 14 },
      },
    },
  };
});

const mockUseAuth = useAuth as jest.Mock;
const mockUseNavigation = useNavigation as jest.Mock;
const mockNavigate = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  mockUseNavigation.mockReturnValue({ navigate: mockNavigate });
});

describe('HomeScreen', () => {
  it('renderiza HomeScreen correctamente', () => {
    mockUseAuth.mockReturnValue({ user: { id: '1', name: 'Test' } });

    const { getByText, getByTestId } = render(<HomeScreen />);

    expect(getByText('Lo más reciente')).toBeTruthy();
    expect(getByTestId('home-scrollview')).toBeTruthy();
    expect(getByTestId('cards-section')).toBeTruthy();
    expect(getByTestId('recent-section')).toBeTruthy();
    expect(getByTestId('banner-carousel')).toBeTruthy();
  });

  it('navega a Cards al presionar la tarjeta correspondiente', () => {
    mockUseAuth.mockReturnValue({ user: { id: '1', name: 'Test' } });
    const { getByText } = render(<HomeScreen />);

    fireEvent.press(getByText('Tarjetas'));
    expect(mockNavigate).toHaveBeenCalledWith('Cards');
  });

  it('navega a Movements al presionar la tarjeta correspondiente', () => {
    mockUseAuth.mockReturnValue({ user: { id: '1', name: 'Test' } });
    const { getByText } = render(<HomeScreen />);

    fireEvent.press(getByText('Movimientos'));
    expect(mockNavigate).toHaveBeenCalledWith('Movements');
  });

  it('navega a Loans al presionar la tarjeta correspondiente', () => {
    mockUseAuth.mockReturnValue({ user: { id: '1', name: 'Test' } });
    const { getByText } = render(<HomeScreen />);

    fireEvent.press(getByText('Préstamos'));
    expect(mockNavigate).toHaveBeenCalledWith('Loans');
  });

  it('navega a Services al presionar la tarjeta correspondiente', () => {
    mockUseAuth.mockReturnValue({ user: { id: '1', name: 'Test' } });
    const { getByText } = render(<HomeScreen />);

    fireEvent.press(getByText('Servicios'));
    expect(mockNavigate).toHaveBeenCalledWith('Services');
  });

  // Opcional: prueba con usuario null
  it('renderiza sin errores cuando no hay usuario', () => {
    mockUseAuth.mockReturnValue({ user: null });
    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId('home-scrollview')).toBeTruthy();
  });
});
