import { useAuth } from '@modules/auth/hooks/useAuth';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, theme } from 'react-native-hooks';

export function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {user?.name}</Text>
      <Button label="Cerrar sesión" variant="filled" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
  },
  title: {
    fontSize: theme.typography.title.fontSize,
    fontWeight: theme.typography.title.fontWeight,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
});
