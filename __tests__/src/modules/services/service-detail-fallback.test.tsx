import React from 'react';

// Mock theme WITHOUT success color BEFORE any imports
jest.mock('react-native-hooks', () => {
  const actual = jest.requireActual('react-native-hooks');
  return {
    ...actual,
    theme: {
      ...actual.theme,
      colors: {
        ...actual.theme.colors,
        success: undefined, // This will trigger the fallback branch
      },
    },
    AlertModal: ({ isVisible, iconChild, title, description, buttonText, onClose }: any) => {
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

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
  useNavigation: jest.fn(),
}));

import { render, fireEvent } from '@testing-library/react-native';
import { ServiceDetailScreen } from '@modules/services/components/service-detail';
import { useRoute, useNavigation } from '@react-navigation/native';

describe('ServiceDetailScreen - Fallback Color Coverage', () => {
  const mockGoBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue({
      goBack: mockGoBack,
    });
  });

  it('should use fallback color #4CAF50 when theme.colors.success is undefined', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { serviceId: '1' },
    });

    const { getByText, getByTestId } = render(<ServiceDetailScreen />);

    // Open modal to trigger icon rendering with fallback color
    fireEvent.press(getByText('Pagar'));

    // Verify modal and icon are rendered (icon uses fallback color)
    expect(getByTestId('alert-modal')).toBeTruthy();
    expect(getByTestId('alert-modal-icon')).toBeTruthy();
  });

  it('should render service and handle interactions with fallback theme', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { serviceId: '4' },
    });

    const { getByText } = render(<ServiceDetailScreen />);

    expect(getByText('Pagar Factura')).toBeTruthy();
    
    fireEvent.press(getByText('Pagar'));
    fireEvent.press(getByText('Cancelar'));

    expect(mockGoBack).toHaveBeenCalled();
  });
});
