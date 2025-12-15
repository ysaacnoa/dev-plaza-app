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

  it('does not call loadMore if loading or hasMore is false', () => {
    const loadMore = jest.fn();
    (usePagination as jest.Mock).mockReturnValue({
      data: [mockData[0]],
      total: 2,
      loading: true,
      hasMore: false,
      loadMore,
      refresh: jest.fn(),
    });

    const { getByTestId } = render(<MovementsScreen />);
    fireEvent(getByTestId('movements-list'), 'onEndReached');

    expect(loadMore).not.toHaveBeenCalled();
  });

  it('calls refresh when pulling to refresh', () => {
    const refresh = jest.fn();
    (usePagination as jest.Mock).mockReturnValue({
      data: mockData,
      total: 2,
      loading: false,
      hasMore: true,
      loadMore: jest.fn(),
      refresh,
    });

    const { getByTestId } = render(<MovementsScreen />);

    fireEvent(getByTestId('movements-list'), 'onRefresh');

    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it('renders ItemSeparatorComponent', () => {
    (usePagination as jest.Mock).mockReturnValue({
      data: mockData,
      total: 2,
      loading: false,
      hasMore: false,
      loadMore: jest.fn(),
      refresh: jest.fn(),
    });

    const { getByTestId } = render(<MovementsScreen />);

    // Renderiza el separador entre items
    const separator = getByTestId('movement-item-separator');
    expect(separator).toBeTruthy();
  });

  it('calculates totalIncome and totalExpense correctly', () => {
    jest.mock('@modules/movements/hooks/useMovementTotals', () => ({
      useMovementsTotals: jest.fn().mockReturnValue({
        totalIncome: 100,
        totalExpense: 40,
      }),
    }));

    (usePagination as jest.Mock).mockReturnValue({
      data: mockData,
      total: 2,
      loading: false,
      hasMore: false,
      loadMore: jest.fn(),
      refresh: jest.fn(),
    });

    const { getByTestId } = render(<MovementsScreen />);
    const header = getByTestId('movements-list').props.ListHeaderComponent;

    expect(header.props.totalIncome).toBe(100);
    expect(header.props.totalExpense).toBe(40);
  });
});
