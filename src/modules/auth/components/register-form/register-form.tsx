import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { InputText, Button, theme } from 'react-native-hooks';
import { useRegisterForm } from '../../hooks/useRegisterForm';


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

      <InputText placeholder="Nombre" value={name} onChangeText={handleChangeName} />
      <InputText placeholder="Apellido" value={lastname} onChangeText={handleChangeLastname} />
      <InputText placeholder="Correo" value={email} onChangeText={handleChangeEmail} />
      <InputText placeholder="Contraseña" password value={password} onChangeText={handleChangePassword} />

      <Button label="Registrarme" variant="filled" onPress={handleSubmit} disabled={loading} />
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
