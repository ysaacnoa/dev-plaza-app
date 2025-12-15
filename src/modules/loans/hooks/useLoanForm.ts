import { useUserStore } from '@modules/user/store/user-store';
import { useState } from 'react';
import { Alert } from 'react-native';
import { validateLoanForm } from '../validator/loan-form.validator';

export interface LoanFormData {
  documentType: 'DNI' | 'Pasaporte';
  documentNumber: string;
  email: string;
  phone: string;
  names: string;
  lastnames: string;
  amount: string;
  installments: string;
}

type FormErrors = Partial<Record<keyof LoanFormData, string>>;

export function useLoanForm() {
  const { user } = useUserStore();

  const [form, setForm] = useState<LoanFormData>({
    documentType: 'DNI',
    documentNumber: user?.dni || '',
    email: user?.email || '',
    phone: '',
    names: user?.name || '',
    lastnames: user?.lastname || '',
    amount: '',
    installments: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field: keyof LoanFormData, value: string) => {
    const trimmedValue = value.trim();
    setForm(prev => ({ ...prev, [field]: trimmedValue }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    const { isValid, errors: validationErrors } = validateLoanForm(form);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      console.log('Solicitud de préstamo enviada:', form);

      Alert.alert(
        '¡Éxito!',
        'Tu solicitud ha sido enviada. Un colaborador se contactará contigo pronto.',
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo enviar la solicitud. Intenta más tarde.',
      );
      console.error('Error al enviar la solicitud de préstamo:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const hasErrors = Object.values(errors).some(
    errorMessage => errorMessage !== undefined && errorMessage !== '',
  );

  return {
    form,
    errors,
    submitting,
    hasErrors,
    updateField,
    handleSubmit,
  };
}
