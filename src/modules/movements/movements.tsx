import { FlatList, StyleSheet, View } from 'react-native';
import { theme, Tile } from 'react-native-hooks';
import { MovementHeader } from './components/movement-header';
import { Movement } from './mock/mock';
import { fetchMovements } from './services/fetch-movements';
import { usePagination } from './hooks/usePagination';
import { useMovementsTotals } from './hooks/useMovementTotals';

export function ItemSeparator() {
  return <View testID="movement-item-separator" style={{ height: theme.spacing.md }} />;
}

export function MovementsScreen() {
  const { data, total, loading, hasMore, loadMore, refresh } =
    usePagination<Movement>(fetchMovements, {
      pageSize: 15,
    });

  const { totalIncome, totalExpense } = useMovementsTotals(data);

  return (
    <View style={styles.container} testID="movements-screen">
      <FlatList
        testID="movements-list"
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{ marginHorizontal: theme.spacing.lg }}
            testID={`movement-item-${item.id}`}
          >
            <Tile
              category={item.category}
              description={item.description}
              date={item.date}
              amount={item.amount}
              type={item.type}
            />
          </View>
        )}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <MovementHeader
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            loaded={data.length}
            allTransactions={total ?? data.length}
          />
        }
        onEndReached={() => {
          if (!loading && hasMore) loadMore();
        }}
        onEndReachedThreshold={0.5}
        refreshing={loading}
        onRefresh={refresh}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing.none,
    backgroundColor: theme.colors.surface,
  },
  separator: { height: theme.spacing.md },
});
