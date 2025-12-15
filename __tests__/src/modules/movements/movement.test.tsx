import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MovementsScreen } from '@modules/movements/movements';
import { usePagination } from '@modules/movements/hooks/usePagination';

jest.mock('react-native-hooks', () => {
  const actual = jest.requireActual('react-native-hooks');
  return {
    ...actual,
    Tile: ({ children }: any) => children ?? null,
  };
});

jest.mock('@modules/movements/services/fetch-movements');

jest.mock('@modules/movements/hooks/usePagination', () => ({
  usePagination: jest.fn(),
}));

const mockData = [
  {
    id: '1',
    amount: 100,
    type: 'income',
    category: 'Salary',
    description: 'Pago',
    date: '2024-01-01',
  },
  {
    id: '2',
    amount: 40,
    type: 'expense',
    category: 'Food',
    description: 'Cena',
    date: '2024-01-02',
  },
];

describe('MovementsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render list and header correctly', async () => {
    (usePagination as jest.Mock).mockReturnValue({
      data: mockData,
      total: 2,
      loading: false,
      hasMore: false,
      loadMore: jest.fn(),
      refresh: jest.fn(),
    });

    const { findAllByTestId, getByTestId } = render(<MovementsScreen />);

    expect(getByTestId('movements-screen')).toBeTruthy();

    const items = await findAllByTestId(/^movement-item-\d+$/);
    expect(items.length).toBe(2);
  });

  it('should load more when reaching end', async () => {
    const loadMore = jest.fn();

    (usePagination as jest.Mock).mockReturnValue({
      data: [mockData[0]],
      total: 2,
      loading: false,
      hasMore: true,
      loadMore,
      refresh: jest.fn(),
    });

    const { getByTestId } = render(<MovementsScreen />);

    const list = getByTestId('movements-list');

    fireEvent(list, 'onEndReached');

    expect(loadMore).toHaveBeenCalledTimes(1);
  });
});
