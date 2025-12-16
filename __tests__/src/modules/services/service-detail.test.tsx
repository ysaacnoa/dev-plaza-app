import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ServiceDetailScreen } from '@modules/services/components/service-detail';
import { useRoute, useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
  useNavigation: jest.fn(),
}));

let mockTheme: any;

jest.mock('react-native-hooks', () => {
  const actual = jest.requireActual('react-native-hooks');
  mockTheme = actual.theme;
  return {
    ...actual,
    get theme() {
      return mockTheme;
    },
    getConnectionInfo: jest.fn(),
    AlertModal: ({
      isVisible,
      title,
      description,
      buttonText,
      onClose,
      iconChild,
    }: any) => {
      const { View, Text, TouchableOpacity } = require('react-native');
      if (!isVisible) return null;
      return (
        <View testID="alert-modal">
          {iconChild && <View testID="alert-modal-icon">{iconChild}</View>}
          <Text testID="alert-modal-title">{title}</Text>
          <Text testID="alert-modal-description">{description}</Text>
          <TouchableOpacity testID="alert-modal-button" onPress={onClose}>
            <Text>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      );
    },
  };
});

import { getConnectionInfo } from 'react-native-hooks';

describe('ServiceDetailScreen', () => {
  const mockGoBack = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue({
      goBack: mockGoBack,
      navigate: mockNavigate,
    });
  });

  it('should render service details correctly', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { serviceId: '1' },
    });

    const { getByText } = render(<ServiceDetailScreen />);

    expect(getByText('Reclamos y Quejas')).toBeTruthy();
    expect(getByText(/Completa los datos necesarios/)).toBeTruthy();
  });

  it('should render different service when serviceId changes', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { serviceId: '4' },
    });

    const { getByText } = render(<ServiceDetailScreen />);

    expect(getByText('Pagar Factura')).toBeTruthy();
  });

  it('should render pay and cancel buttons', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { serviceId: '7' },
    });

    const { getByText } = render(<ServiceDetailScreen />);

    expect(getByText('Pagar')).toBeTruthy();
    expect(getByText('Cancelar')).toBeTruthy();
  });

  it('should go back when cancel button is pressed', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { serviceId: '1' },
    });

    const { getByText } = render(<ServiceDetailScreen />);

    fireEvent.press(getByText('Cancelar'));

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it('should close success modal and go back when modal button is pressed', async () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { serviceId: '1' },
    });

    (getConnectionInfo as jest.Mock).mockResolvedValue({
      type: 'wifi',
      isConnected: true,
      isInternetReachable: true,
    });

    const { getByText, findByTestId } = render(<ServiceDetailScreen />);
    fireEvent.press(getByText('Pagar'));

    const modalButton = await findByTestId('alert-modal-button');
    fireEvent.press(modalButton);

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it('should render icon in modal when modal is visible', async () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { serviceId: '1' },
    });

    (getConnectionInfo as jest.Mock).mockResolvedValue({
      type: 'wifi',
      isConnected: true,
      isInternetReachable: true,
    });

    const { getByText, findByTestId } = render(<ServiceDetailScreen />);
    fireEvent.press(getByText('Pagar'));

    const icon = await findByTestId('alert-modal-icon');
    expect(icon).toBeTruthy();
  });

  it('should display success modal when internet is available', async () => {
    (useRoute as jest.Mock).mockReturnValue({ params: { serviceId: '1' } });

    (getConnectionInfo as jest.Mock).mockResolvedValue({
      type: 'wifi',
      isConnected: true,
      isInternetReachable: true,
    });

    const { getByText, findByTestId } = render(<ServiceDetailScreen />);
    fireEvent.press(getByText('Pagar'));

    const modal = await findByTestId('alert-modal');
    expect(modal).toBeTruthy();
    expect(getByText('¡Servicio pagado con éxito!')).toBeTruthy();
  });

  it('should show no-internet modal when connection is none', async () => {
    (useRoute as jest.Mock).mockReturnValue({ params: { serviceId: '1' } });

    (getConnectionInfo as jest.Mock).mockResolvedValue({
      type: 'none',
      isConnected: false,
      isInternetReachable: false,
    });

    const { getByText, findByText } = render(<ServiceDetailScreen />);
    fireEvent.press(getByText('Pagar'));

    const modal = await findByText('Sin conexión a internet');
    expect(modal).toBeTruthy();
  });

  it('should show no-internet modal when connection is unknown', async () => {
    (useRoute as jest.Mock).mockReturnValue({ params: { serviceId: '1' } });

    (getConnectionInfo as jest.Mock).mockResolvedValue({
      type: 'unknown',
      isConnected: true,
      isInternetReachable: false,
    });

    const { getByText, findByText } = render(<ServiceDetailScreen />);
    fireEvent.press(getByText('Pagar'));

    const modal = await findByText('Sin conexión a internet');
    expect(modal).toBeTruthy();
  });

  it('should fallback to no-internet modal if getConnectionInfo throws', async () => {
    (useRoute as jest.Mock).mockReturnValue({ params: { serviceId: '1' } });

    (getConnectionInfo as jest.Mock).mockRejectedValue(
      new Error('Network error'),
    );

    const { getByText, findByText } = render(<ServiceDetailScreen />);
    fireEvent.press(getByText('Pagar'));

    const modal = await findByText('Sin conexión a internet');
    expect(modal).toBeTruthy();
  });

  it('should render all service details for different service IDs', () => {
    const serviceIds = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
    ];

    serviceIds.forEach(serviceId => {
      (useRoute as jest.Mock).mockReturnValue({
        params: { serviceId },
      });

      const { unmount } = render(<ServiceDetailScreen />);
      unmount();
    });
  });

  it('should handle modal state transitions correctly', async () => {
    (useRoute as jest.Mock).mockReturnValue({ params: { serviceId: '1' } });

    (getConnectionInfo as jest.Mock).mockResolvedValue({
      type: 'wifi',
      isConnected: true,
      isInternetReachable: true,
    });

    const { getByText, queryByTestId, findByTestId } = render(
      <ServiceDetailScreen />,
    );
    expect(queryByTestId('alert-modal')).toBeNull();

    fireEvent.press(getByText('Pagar'));
    const modal = await findByTestId('alert-modal');
    expect(modal).toBeTruthy();

    fireEvent.press(await findByTestId('alert-modal-button'));
    expect(mockGoBack).toHaveBeenCalled();
  });
});
