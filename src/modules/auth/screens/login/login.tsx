import { LoginForm } from '@modules/auth/components/login-form';
import { AuthNavigationProp } from '@navigation/auth-stack';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from 'react-native-hooks';

export function LoginScreen() {
  const navigation = useNavigation<AuthNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <LoginForm />

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Crear cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.xl,
    gap: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.typography.title.fontSize,
    fontWeight: theme.typography.title.fontWeight,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  link: {
    color: theme.colors.primary,
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
});
