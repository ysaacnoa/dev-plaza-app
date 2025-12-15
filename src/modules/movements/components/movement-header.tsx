import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from 'react-native-hooks';

export const MovementHeader = ({
  totalExpense,
  totalIncome,
  loaded,
  allTransactions,
}: {
  totalExpense: number;
  totalIncome: number;
  loaded: number;
  allTransactions: number;
}) => {
  return (
    <View style={styles.container} testID="movement-header">
      <View style={styles.header}>
        <Text style={styles.title} testID="movement-header-title">
          Transacciones Recientes
        </Text>
      </View>

      <View style={styles.statsContainer} testID="movement-header-stats">
        <View style={styles.statColumn}>
          <Text style={styles.statLabel} testID="movement-header-income-label">
            Total Ingresos
          </Text>
          <Text
            style={[styles.statValue, styles.positive]}
            testID="movement-header-total-income"
          >
            +S/. {totalIncome.toFixed(2)}
          </Text>
          <View
            style={[styles.indicator, styles.incomeIndicator]}
            testID="movement-header-income-indicator"
          />
        </View>

        <View style={styles.separator} />

        <View style={styles.statColumn}>
          <Text style={styles.statLabel} testID="movement-header-expense-label">
            Total Gastos
          </Text>
          <Text
            style={[styles.statValue, styles.negative]}
            testID="movement-header-total-expense"
          >
            -S/. {totalExpense.toFixed(2)}
          </Text>
          <View
            style={[styles.indicator, styles.expenseIndicator]}
            testID="movement-header-expense-indicator"
          />
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.footer} testID="movement-header-footer">
        <Text style={styles.footerText} testID="movement-header-loaded-text">
          📋 Mostrando{' '}
          <Text style={styles.bold} testID="movement-header-loaded-count">
            {loaded}
          </Text>{' '}
          de{' '}
          <Text style={styles.bold} testID="movement-header-total-count">
            {allTransactions}
          </Text>{' '}
          transacciones
        </Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    marginHorizontal: theme.spacing.lg,
    padding: theme.spacing.xl,
    marginVertical: theme.spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.title.fontSize,
    fontWeight: '800',
    color: theme.colors.white,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.xl,
  },
  statColumn: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: theme.typography.label.fontSize,
    fontWeight: '600',
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  statValue: {
    fontSize: theme.typography?.title?.fontSize,
    fontWeight: '800',
    marginBottom: theme.spacing.sm,
  },
  positive: {
    color: theme.colors.success,
  },
  negative: {
    color: theme.colors.danger,
  },
  indicator: {
    width: 60,
    height: 4,
    borderRadius: 2,
    marginTop: theme.spacing.xs,
  },
  incomeIndicator: {
    backgroundColor: theme.colors.success,
  },
  expenseIndicator: {
    backgroundColor: theme.colors.danger,
  },
  separator: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: theme.spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: theme.spacing.lg,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  bold: {
    fontWeight: theme.typography.title.fontWeight,
    color: theme.colors.white,
  },
});