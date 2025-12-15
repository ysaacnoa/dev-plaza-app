import React from 'react';
import { render } from '@testing-library/react-native';
import { MovementsScreen } from '@modules/movements/movements';

jest.mock('@modules/movements/hooks/usePagination', () => ({
  usePagination: jest.fn(),
}));

jest.mock('@modules/movements/hooks/useMovementTotals', () => ({
  useMovementsTotals: jest.fn(() => ({
    totalIncome: 1000,
    totalExpense: 500,
  })),
}));

jest.mock('react-native-hooks', () => ({
  theme: {
    spacing: { md: 8, lg: 16, none: 0, xl: 24, sm: 4, xs: 2 },
    colors: { 
      surface: '#fff', 
      primary: '#007bff', 
      white: '#fff',
      textMuted: '#999',
      success: '#28a745',
      danger: '#dc3545',
    },
    radius: { lg: 8 },
    typography: {
      title: { fontSize: 18, fontWeight: '700' },
      subtitle: { fontSize: 14 },
      label: { fontSize: 12 },
    },
  },
  Tile: () => null,
}));

import { usePagination } from '@modules/movements/hooks/usePagination';

const mockUsePagination = usePagination as jest.Mock;

describe('MovementsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with total from pagination', () => {
    mockUsePagination.mockReturnValue({
      data: [
        { id: 1, category: 'Food', description: 'Lunch', date: '2024-01-01', amount: 100, type: 'expense' },
      ],
      total: 50,
      loading: false,
      hasMore: true,
      loadMore: jest.fn(),
      refresh: jest.fn(),
    });

    const { getByTestId } = render(<MovementsScreen />);
    expect(getByTestId('movements-screen')).toBeTruthy();
  });

  it('renders correctly when total is null (covers line 47 branch)', () => {
    mockUsePagination.mockReturnValue({
      data: [
        { id: 1, category: 'Food', description: 'Lunch', date: '2024-01-01', amount: 100, type: 'expense' },
      ],
      total: null, // This will trigger the ?? operator on line 47
      loading: false,
      hasMore: true,
      loadMore: jest.fn(),
      refresh: jest.fn(),
    });

    const { getByTestId } = render(<MovementsScreen />);
    expect(getByTestId('movements-screen')).toBeTruthy();
  });
});
