import { useRegisterForm } from '@modules/auth/hooks/useRegisterForm';
import { Icon } from '@shared/components';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, InputText, theme } from 'react-native-hooks';

export function RegisterForm() {
  const {
    name,
    lastname,
    email,
    password,
    error,
    loading,
    handleChangeName,
    handleChangeLastname,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
  } = useRegisterForm();

  return (
    <View style={styles.form}>
      {error && <Text style={styles.error}>{error}</Text>}

      <InputText
        placeholder="Nombre"
        value={name}
        onChangeText={handleChangeName}
        iconClear={<Icon name="close-circle" />}
        clearable
      />
      <InputText
        placeholder="Apellido"
        value={lastname}
        onChangeText={handleChangeLastname}
        iconClear={<Icon name="close-circle" />}
        clearable
      />
      <InputText
        placeholder="Correo"
        value={email}
        onChangeText={handleChangeEmail}
        iconClear={<Icon name="close-circle" />}
        clearable
      />
      <InputText
        placeholder="Contraseña"
        password
        value={password}
        onChangeText={handleChangePassword}
        iconPasswordShow={<Icon name="eye" />}
        iconPasswordHide={<Icon name="eye-off" />}
        iconClear={<Icon name="close-circle" />}
      />

      <Button
        label="Registrarme"
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
