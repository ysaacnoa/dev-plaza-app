import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from 'react-native-hooks';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../../../../navigation/auth-stack';
import { RegisterForm } from '../../components/register-form';

export function RegisterScreen() {
  const navigation = useNavigation<AuthNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>

      <RegisterForm />

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Ya tengo una cuenta</Text>
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
