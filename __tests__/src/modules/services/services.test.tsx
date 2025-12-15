import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ServicesScreen } from '@modules/services/services';
import { useFilteredServices } from '@modules/services/hooks/useFilteredService';

jest.mock('@modules/services/hooks/useFilteredService', () => ({
  useFilteredServices: jest.fn(),
}));

jest.mock('@modules/services/components/service-item', () => ({
  ServiceItemRow: ({ item }: any) => {
    const { View, Text } = require('react-native');
    return (
      <View testID={`service-item-row-${item.id}`}>
        <Text>{item.title}</Text>
      </View>
    );
  },
}));

jest.mock('react-native-hooks', () => {
  const actual = jest.requireActual('react-native-hooks');
  return {
    ...actual,
    InputText: ({ placeholder, value, onChangeText, testID }: any) => {
      const { TextInput } = require('react-native');
      return (
        <TextInput
          testID={testID || 'search-input'}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
      );
    },
  };
});

const mockServicesData = [
  {
    category: 'Atención al Cliente',
    data: [
      { id: '1', title: 'Reclamos y Quejas', icon: 'alert-circle-outline' },
      { id: '2', title: 'Soporte Técnico', icon: 'headset-outline' },
    ],
  },
  {
    category: 'Pagos y Facturación',
    data: [
      { id: '4', title: 'Pagar Factura', icon: 'card-outline' },
    ],
  },
];

describe('ServicesScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render search input', () => {
    (useFilteredServices as jest.Mock).mockReturnValue(mockServicesData);

    const { getByTestId } = render(<ServicesScreen />);

    expect(getByTestId('search-input')).toBeTruthy();
  });

  it('should render services list with sections', () => {
    (useFilteredServices as jest.Mock).mockReturnValue(mockServicesData);

    const { getByTestId } = render(<ServicesScreen />);

    expect(getByTestId('service-item-row-1')).toBeTruthy();
    expect(getByTestId('service-item-row-2')).toBeTruthy();
    expect(getByTestId('service-item-row-4')).toBeTruthy();
  });

  it('should update search query when typing', () => {
    (useFilteredServices as jest.Mock).mockReturnValue(mockServicesData);

    const { getByTestId } = render(<ServicesScreen />);

    const searchInput = getByTestId('search-input');

    fireEvent.changeText(searchInput, 'pagar');

    expect(searchInput.props.value).toBe('pagar');
  });

  it('should filter services when search query changes', () => {
    const filteredData = [
      {
        category: 'Pagos y Facturación',
        data: [
          { id: '4', title: 'Pagar Factura', icon: 'card-outline' },
        ],
      },
    ];

    (useFilteredServices as jest.Mock).mockReturnValue(filteredData);

    const { getByTestId, queryByTestId } = render(<ServicesScreen />);

    expect(getByTestId('service-item-row-4')).toBeTruthy();
    expect(queryByTestId('service-item-row-1')).toBeNull();
    expect(queryByTestId('service-item-row-2')).toBeNull();
  });

  it('should render empty list when no services match', () => {
    (useFilteredServices as jest.Mock).mockReturnValue([]);

    const { queryByTestId } = render(<ServicesScreen />);

    expect(queryByTestId('service-item-row-1')).toBeNull();
    expect(queryByTestId('service-item-row-2')).toBeNull();
    expect(queryByTestId('service-item-row-4')).toBeNull();
  });

  it('should call useFilteredServices with search query', () => {
    (useFilteredServices as jest.Mock).mockReturnValue(mockServicesData);

    const { getByTestId } = render(<ServicesScreen />);

    expect(useFilteredServices).toHaveBeenCalledWith('');

    fireEvent.changeText(getByTestId('search-input'), 'soporte');

    expect(useFilteredServices).toHaveBeenCalledWith('soporte');
  });

  it('should render section headers', () => {
    (useFilteredServices as jest.Mock).mockReturnValue(mockServicesData);

    const { getByText } = render(<ServicesScreen />);

    expect(getByText('Atención al Cliente')).toBeTruthy();
    expect(getByText('Pagos y Facturación')).toBeTruthy();
  });

  it('should clear search when clearable is used', () => {
    (useFilteredServices as jest.Mock).mockReturnValue(mockServicesData);

    const { getByTestId } = render(<ServicesScreen />);

    const searchInput = getByTestId('search-input');

    fireEvent.changeText(searchInput, 'test query');
    expect(searchInput.props.value).toBe('test query');

    fireEvent.changeText(searchInput, '');
    expect(searchInput.props.value).toBe('');
  });
});
