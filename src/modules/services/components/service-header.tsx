import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from 'react-native-hooks';

interface ServiceSectionHeaderProps {
  category: string;
}

export function ServiceSectionHeader({ category }: ServiceSectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});