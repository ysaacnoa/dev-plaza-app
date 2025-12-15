import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { InputText, Dropdown, Button } from 'react-native-hooks';
import { theme } from 'react-native-hooks';
import { useLoanForm } from './hooks/useLoanForm';
import { INSTALLMENT_OPTIONS } from './constants/installment-options';

export function LoansScreen() {
  const { form, errors, submitting, updateField, handleSubmit } = useLoanForm();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      testID="loan-scrollview"
    >
      <Text style={styles.title} testID="loan-title">Formulario</Text>
      <Text style={styles.subtitle} testID="loan-subtitle">
        Completa tus datos y un colaborador se contactará contigo
      </Text>

      <View style={styles.form}>
        <Text>Tipo de documento</Text>
        <View style={styles.documentRow}>
          <View style={styles.dropdownContainer}>
            <Dropdown
              value={form.documentType}
              options={[
                { label: 'DNI', value: 'DNI' },
                { label: 'Pasaporte', value: 'Pasaporte' },
              ]}
              onChange={value =>
                updateField('documentType', value as 'DNI' | 'Pasaporte')
              }
              testID="document-type-dropdown"
            />
          </View>

          <View style={styles.inputContainer}>
            <InputText
              placeholder={form.documentType === 'DNI' ? '75012345' : 'A12345678'}
              keyboardType="default"
              value={form.documentNumber}
              onChangeText={text => updateField('documentNumber', text)}
              error={!!errors.documentNumber}
              testID="document-number-input"
            />
          </View>
        </View>

        <InputText
          placeholder="Correo electrónico"
          keyboardType="email-address"
          value={form.email}
          onChangeText={text => updateField('email', text)}
          error={!!errors.email}
          testID="email-input"
        />

        <InputText
          placeholder="Número de celular"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={text => updateField('phone', text)}
          error={!!errors.phone}
          testID="phone-input"
        />

        <InputText
          placeholder="Nombres"
          value={form.names}
          onChangeText={text => updateField('names', text)}
          error={!!errors.names}
          testID="names-input"
        />

        <InputText
          placeholder="Apellidos"
          value={form.lastnames}
          onChangeText={text => updateField('lastnames', text)}
          error={!!errors.lastnames}
          testID="lastnames-input"
        />

        <InputText
          placeholder="Monto del préstamo"
          keyboardType="numeric"
          value={form.amount}
          onChangeText={text => updateField('amount', text)}
          error={!!errors.amount}
          testID="amount-input"
        />

        <Dropdown
          label="Cuotas"
          value={form.installments}
          options={INSTALLMENT_OPTIONS}
          onChange={value => updateField('installments', value)}
          testID="installments-dropdown"
        />

        <Button
          label="Enviar datos"
          variant="filled"
          onPress={handleSubmit}
          disabled={submitting}
          testID="submit-button"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.xl,
    paddingBottom: theme.spacing.xl * 2,
    backgroundColor: theme.colors.surface,
  },
  documentRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    alignItems: 'flex-end',
  },
  dropdownContainer: {
    flex: 1,
  },
  inputContainer: {
    flex: 2,
  },
  title: {
    fontSize: theme.typography.title.fontSize,
    fontWeight: theme.typography.title.fontWeight,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xl,
  },
  form: {
    gap: theme.spacing.lg,
  },
});
