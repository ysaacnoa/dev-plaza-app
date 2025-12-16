import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { Icon, type IconName } from '../../../shared/components/icon';
import { Card } from 'react-native-hooks';

interface CardItem {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  onPress: () => void;
}

interface GridProps {
  services: CardItem[];
}

export function Grid({ services }: GridProps) {
  return (
    <View>
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            description={item.description}
            iconChild={<Icon name={item.icon} size={36} color="yellow" />}
            onPress={item.onPress}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
