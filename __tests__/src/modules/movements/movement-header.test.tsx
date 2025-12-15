import React from 'react';
import { render } from '@testing-library/react-native';
import { MovementHeader } from '@modules/movements/components/movement-header';

describe('MovementHeader', () => {
  it('should render totals correctly', () => {
    const { getByTestId } = render(
      <MovementHeader
        totalIncome={150}
        totalExpense={50}
        loaded={3}
        allTransactions={10}
      />,
    );

    expect(getByTestId('movement-header-total-income').props.children.join(''))
      .toContain('150.00');

    expect(getByTestId('movement-header-total-expense').props.children.join(''))
      .toContain('50.00');

    expect(getByTestId('movement-header-loaded-count').props.children).toBe(3);
    expect(getByTestId('movement-header-total-count').props.children).toBe(10);
  });

  it('should render title', () => {
    const { getByTestId } = render(
      <MovementHeader
        totalIncome={0}
        totalExpense={0}
        loaded={0}
        allTransactions={0}
      />,
    );

    expect(getByTestId('movement-header-title')).toBeTruthy();
  });
});
