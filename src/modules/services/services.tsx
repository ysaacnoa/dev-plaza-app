import React, { useState } from 'react';
import { View, SectionList, StyleSheet } from 'react-native';
import { InputText, theme } from 'react-native-hooks';
import { Icon } from '@shared/components';
import { ServiceItemRow } from './components/service-item';
import { ServiceSectionHeader } from './components/service-header';
import { useFilteredServices } from './hooks/useFilteredService';


export function ServicesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const sections = useFilteredServices(searchQuery);

  return (
    <View style={styles.container}>
      <InputText
        placeholder="Buscar servicio..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
        iconClear={<Icon name="close-circle-outline" />}
        clearable
      />

      <SectionList
        sections={sections}
        renderItem={({ item }) => <ServiceItemRow item={item} />}
        renderSectionHeader={({ section }) => (
          <ServiceSectionHeader category={section.category} />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  searchInput: {
    marginBottom: theme.spacing.md,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
});