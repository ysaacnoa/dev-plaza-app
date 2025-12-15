import { LoanFormData } from '../hooks/useLoanForm';

type ValidationResult = {
  isValid: boolean;
  errors: Partial<Record<keyof LoanFormData, string>>;
};

export function validateLoanForm(form: LoanFormData): ValidationResult {
  const errors: Partial<Record<keyof LoanFormData, string>> = {};

  // Tipo de documento (siempre requerido)
  if (!form.documentType) {
    errors.documentType = 'Selecciona tipo de documento';
  }

  // Número de documento - validación condicional
  if (!form.documentNumber.trim()) {
    errors.documentNumber = 'Ingresa tu número de documento';
  } else {
    if (form.documentType === 'DNI') {
      if (!/^\d{8}$/.test(form.documentNumber)) {
        errors.documentNumber = 'El DNI debe tener exactamente 8 dígitos';
      }
    } else if (form.documentType === 'Pasaporte') {
      if (form.documentNumber.length < 6) {
        errors.documentNumber = 'El pasaporte debe tener al menos 6 caracteres';
      }

      if (!/^[A-Za-z0-9]+$/.test(form.documentNumber)) {
        errors.documentNumber = 'Solo letras y números';
      }
    }
  }

  // Email
  if (!form.email) {
    errors.email = 'Ingresa tu correo electrónico';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Ingresa un correo válido';
  }

  // Celular
  if (!form.phone) {
    errors.phone = 'Ingresa tu número de celular';
  } else if (!/^9\d{8}$/.test(form.phone)) {
    errors.phone = 'El celular debe empezar con 9 y tener 9 dígitos';
  }

  // Nombres y apellidos
  if (!form.names.trim()) errors.names = 'Ingresa tus nombres';
  if (!form.lastnames.trim()) errors.lastnames = 'Ingresa tus apellidos';

  // Monto
  if (!form.amount) {
    errors.amount = 'Ingresa el monto deseado';
  } else {
    const num = Number(form.amount);
    if (isNaN(num) || num <= 0) {
      errors.amount = 'El monto debe ser un número positivo';
    }
  }

  // Cuotas
  if (!form.installments) {
    errors.installments = 'Selecciona el número de cuotas';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}