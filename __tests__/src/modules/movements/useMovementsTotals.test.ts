import { renderHook } from '@testing-library/react-native';
import { useMovementsTotals } from '@modules/movements/hooks/useMovementTotals';
import { Movement } from '@modules/movements/mock/mock';

describe('useMovementsTotals', () => {
  it('should return 0 totals when movements array is empty', () => {
    const { result } = renderHook(() => useMovementsTotals([]));

    expect(result.current.totalIncome).toBe(0);
    expect(result.current.totalExpense).toBe(0);
  });

  it('should calculate total income and expense correctly', () => {
    const movements: Movement[] = [
      {
        id: '1',
        type: 'income',
        amount: 100,
        category: '',
        description: '',
        date: '',
      },
      {
        id: '2',
        type: 'expense',
        amount: 40,
        category: '',
        description: '',
        date: '',
      },
      {
        id: '3',
        type: 'income',
        amount: 60,
        category: '',
        description: '',
        date: '',
      },
    ];

    const { result } = renderHook(() => useMovementsTotals(movements));

    expect(result.current.totalIncome).toBe(160);
    expect(result.current.totalExpense).toBe(40);
  });

  it('should recalculate when movements change', () => {
    const initialData: Movement[] = [
      {
        id: '1',
        type: 'income',
        amount: 100,
        category: '',
        description: '',
        date: '',
      },
    ];

    const { result, rerender } = renderHook(
      ({ data }: { data: Movement[] }) => useMovementsTotals(data),
      {
        initialProps: { data: initialData },
      },
    );

    expect(result.current.totalIncome).toBe(100);

    rerender({
      data: [
        {
          id: '1',
          type: 'income',
          amount: 100,
          category: '',
          description: '',
          date: '',
        },
        {
          id: '2',
          type: 'expense',
          amount: 30,
          category: '',
          description: '',
          date: '',
        },
      ],
    });

    expect(result.current.totalExpense).toBe(30);
  });
});
