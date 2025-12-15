import { useMemo } from 'react';
import { Movement } from '../mock/mock';

export function useMovementsTotals(movements: Movement[]) {
  return useMemo(() => {
    const totalIncome = movements
      .filter(m => m.type === 'income')
      .reduce((sum, m) => sum + m.amount, 0);

    const totalExpense = movements
      .filter(m => m.type === 'expense')
      .reduce((sum, m) => sum + m.amount, 0);

    return { totalIncome, totalExpense };
  }, [movements]);
}