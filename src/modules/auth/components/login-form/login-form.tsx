import { useLoginForm } from '@modules/auth/hooks/useLoginForm';
import { Icon } from '@shared/components';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, InputText, theme } from 'react-native-hooks';

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
        iconClear={<Icon name='close-circle'/>}
        clearable
      />

      <InputText
        placeholder="Contraseña"
        password
        value={password}
        onChangeText={handleChangePassword}
        clearable
        iconPasswordShow={<Icon name='eye'/>}
        iconPasswordHide={<Icon name='eye-off'/>}
        iconClear={<Icon name='close-circle'/>}
      />

      <Button
        label="Ingresar"
        variant="filled"
        onPress={handleSubmit}
        disabled={loading}
      />
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
