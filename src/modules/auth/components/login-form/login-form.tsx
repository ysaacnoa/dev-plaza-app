import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { InputText, Button, theme } from 'react-native-hooks';
import { useLoginForm } from '../../hooks/useLoginForm';

export function LoginForm() {
  const {
    email,
    password,
    error,
    loading,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
  } = useLoginForm();

  return (
    <View style={styles.form}>
      {error && <Text style={styles.error}>{error}</Text>}

      <InputText
        placeholder="Correo"
        keyboardType="email-address"
        value={email}
        onChangeText={handleChangeEmail}
      />

      <InputText
        placeholder="Contraseña"
        password
        value={password}
        onChangeText={handleChangePassword}
      />

      <Button label="Ingresar" variant="filled" onPress={handleSubmit} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: theme.spacing.md,
  },
  error: {
    color: theme.colors.danger,
    marginBottom: theme.spacing.md,
  },
});
