import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from 'react-native-hooks';
import { useAuth } from '@modules/auth/hooks/useAuth';

interface WelcomeSectionProps {
  userName?: string;
}

/**
 * WelcomeSection - Header section with greeting
 * Displays personalized welcome message with user name
 */
export function WelcomeSection({ userName }: WelcomeSectionProps) {
  const { user } = useAuth();
  const displayName = userName || user?.name || 'Usuario';

  return (
    <View style={styles.container}>
      <View style={styles.greetingRow}>
        <Text style={styles.greeting}>Bienvenido </Text>
        <Text style={styles.userName}>{displayName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: 'white',
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  greeting: {
    fontSize: 16,
    fontWeight: '400',
    color: theme.colors.text,
  },
  userName: {
    fontSize: 16,
    fontWeight: '400',
    color: theme.colors.primary,
  },
});
