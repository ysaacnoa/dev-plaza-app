import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ServiceItemRow } from '@modules/services/components/service-item';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('react-native-hooks', () => {
  const actual = jest.requireActual('react-native-hooks');
  return {
    ...actual,
    Item: ({ testID, title, onPress, children }: any) => {
      const { TouchableOpacity, Text } = require('react-native');
      return (
        <TouchableOpacity testID={testID} onPress={onPress}>
          <Text>{title}</Text>
          {children}
        </TouchableOpacity>
      );
    },
  };
});

describe('ServiceItemRow', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
  });

  it('should render service item with title', () => {
    const item = {
      id: '1',
      title: 'Reclamos y Quejas',
      icon: 'alert-circle-outline' as const,
    };

    const { getByText } = render(<ServiceItemRow item={item} />);

    expect(getByText('Reclamos y Quejas')).toBeTruthy();
  });

  it('should render with correct testID', () => {
    const item = {
      id: '5',
      title: 'Historial de Pagos',
      icon: 'receipt-outline' as const,
    };

    const { getByTestId } = render(<ServiceItemRow item={item} />);

    expect(getByTestId('service-item-row-5')).toBeTruthy();
  });

  it('should navigate to ServiceDetail when pressed', () => {
    const item = {
      id: '4',
      title: 'Pagar Factura',
      icon: 'card-outline' as const,
    };

    const { getByTestId } = render(<ServiceItemRow item={item} />);

    fireEvent.press(getByTestId('service-item-row-4'));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('ServiceDetail', {
      serviceId: '4',
    });
  });

  it('should navigate with correct serviceId for different items', () => {
    const item1 = {
      id: '7',
      title: 'Instalación Nueva',
      icon: 'home-outline' as const,
    };

    const { getByTestId, rerender } = render(<ServiceItemRow item={item1} />);

    fireEvent.press(getByTestId('service-item-row-7'));

    expect(mockNavigate).toHaveBeenCalledWith('ServiceDetail', {
      serviceId: '7',
    });

    const item2 = {
      id: '10',
      title: 'Upgrade de Velocidad',
      icon: 'speedometer-outline' as const,
    };

    rerender(<ServiceItemRow item={item2} />);

    fireEvent.press(getByTestId('service-item-row-10'));

    expect(mockNavigate).toHaveBeenCalledWith('ServiceDetail', {
      serviceId: '10',
    });
  });
});
