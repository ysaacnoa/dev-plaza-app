import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView
      style={styles.container}
      testID="movements-screen"
      edges={[]}
    >
      <FlatList
        testID="movements-list"
        data={data}
        
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: theme.spacing.lg}}
        renderItem={({ item }) => (
          <View testID={`movement-item-${item.id}`}>
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
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  separator: { height: theme.spacing.md },
});
