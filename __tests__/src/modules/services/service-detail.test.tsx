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
    AlertModal: ({ isVisible, title, description, buttonText, onClose, iconChild }: any) => {
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

  it('should show success modal when pay button is pressed', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { serviceId: '1' },
    });

    const { getByText, queryByTestId } = render(<ServiceDetailScreen />);

    expect(queryByTestId('alert-modal')).toBeNull();

    fireEvent.press(getByText('Pagar'));

    expect(queryByTestId('alert-modal')).toBeTruthy();
    expect(queryByTestId('alert-modal-title')).toBeTruthy();
  });

  it('should not show modal initially (isVisible=false branch)', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { serviceId: '1' },
    });

    const { queryByTestId } = render(<ServiceDetailScreen />);

    // Modal should not be visible initially
    expect(queryByTestId('alert-modal')).toBeNull();
  });

  it('should go back when cancel button is pressed', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { serviceId: '1' },
    });

    const { getByText } = render(<ServiceDetailScreen />);

    fireEvent.press(getByText('Cancelar'));

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it('should close modal and go back when modal is closed', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { serviceId: '1' },
    });

    const { getByText, getByTestId } = render(<ServiceDetailScreen />);

    fireEvent.press(getByText('Pagar'));

    expect(getByTestId('alert-modal')).toBeTruthy();

    fireEvent.press(getByTestId('alert-modal-button'));

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it('should display success message in modal', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { serviceId: '1' },
    });

    const { getByText, getByTestId } = render(<ServiceDetailScreen />);

    fireEvent.press(getByText('Pagar'));

    expect(getByTestId('alert-modal-title')).toBeTruthy();
    expect(getByText('¡Servicio pagado con éxito!')).toBeTruthy();
    expect(getByText(/Tu transacción ha sido procesada correctamente/)).toBeTruthy();
  });

  it('should render pay and cancel buttons', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { serviceId: '7' },
    });

    const { getByText } = render(<ServiceDetailScreen />);

    expect(getByText('Pagar')).toBeTruthy();
    expect(getByText('Cancelar')).toBeTruthy();
  });

  it('should render icon in modal when modal is visible', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { serviceId: '1' },
    });

    const { getByText, getByTestId } = render(<ServiceDetailScreen />);

    fireEvent.press(getByText('Pagar'));

    expect(getByTestId('alert-modal-icon')).toBeTruthy();
  });

  it('should render all service details for different service IDs', () => {
    const serviceIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
    
    serviceIds.forEach(serviceId => {
      (useRoute as jest.Mock).mockReturnValue({
        params: { serviceId },
      });

      const { unmount } = render(<ServiceDetailScreen />);
      // Just verify it renders without crashing
      unmount();
    });
  });

  it('should handle modal state transitions correctly', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { serviceId: '1' },
    });

    const { getByText, queryByTestId, getByTestId } = render(<ServiceDetailScreen />);

    // Initially modal is hidden
    expect(queryByTestId('alert-modal')).toBeNull();

    // Show modal
    fireEvent.press(getByText('Pagar'));
    expect(getByTestId('alert-modal')).toBeTruthy();

    // Close modal
    fireEvent.press(getByTestId('alert-modal-button'));
    expect(mockGoBack).toHaveBeenCalled();
  });
});
