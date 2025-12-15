import { validateLoanForm } from '@modules/loans/validator/loan-form.validator';

describe('validateLoanForm', () => {
  const baseValidForm = {
    documentType: 'DNI' as const,
    documentNumber: '12345678',
    email: 'test@example.com',
    phone: '912345678',
    names: 'Juan',
    lastnames: 'Pérez',
    amount: '5000',
    installments: '12',
  };

  it('returns isValid true when all fields are correct (DNI)', () => {
    const result = validateLoanForm(baseValidForm);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('returns isValid true for valid Pasaporte', () => {
    const result = validateLoanForm({
      ...baseValidForm,
      documentType: 'Pasaporte',
      documentNumber: 'ABC123456',
    });
    expect(result.isValid).toBe(true);
  });

  it('validates DNI length and format', () => {
    const result = validateLoanForm({
      ...baseValidForm,
      documentNumber: '12345', // menos de 8
    });
    expect(result.errors.documentNumber).toBe(
      'El DNI debe tener exactamente 8 dígitos',
    );
  });

  it('validates Pasaporte min length and alphanumeric', () => {
    let result = validateLoanForm({
      ...baseValidForm,
      documentType: 'Pasaporte',
      documentNumber: 'ABC', // menos de 6
    });
    expect(result.errors.documentNumber).toBe(
      'El pasaporte debe tener al menos 6 caracteres',
    );

    result = validateLoanForm({
      ...baseValidForm,
      documentType: 'Pasaporte',
      documentNumber: 'ABC123!', // caracter especial
    });
    expect(result.errors.documentNumber).toBe('Solo letras y números');
  });

  it('validates email format', () => {
    const result = validateLoanForm({
      ...baseValidForm,
      email: 'invalid-email',
    });
    expect(result.errors.email).toBe('Ingresa un correo válido');
  });

  it('validates phone starts with 9 and 9 digits', () => {
    let result = validateLoanForm({
      ...baseValidForm,
      phone: '812345678',
    });
    expect(result.errors.phone).toBe(
      'El celular debe empezar con 9 y tener 9 dígitos',
    );

    result = validateLoanForm({
      ...baseValidForm,
      phone: '91234567', // 8 dígitos
    });
    expect(result.errors.phone).toBe(
      'El celular debe empezar con 9 y tener 9 dígitos',
    );
  });

  it('validates names and lastnames are not empty', () => {
    let result = validateLoanForm({
      ...baseValidForm,
      names: '   ',
    });
    expect(result.errors.names).toBe('Ingresa tus nombres');

    result = validateLoanForm({
      ...baseValidForm,
      lastnames: '',
    });
    expect(result.errors.lastnames).toBe('Ingresa tus apellidos');
  });

  it('validates amount is positive number', () => {
    let result = validateLoanForm({
      ...baseValidForm,
      amount: '0',
    });
    expect(result.errors.amount).toBe('El monto debe ser un número positivo');

    result = validateLoanForm({
      ...baseValidForm,
      amount: 'abc',
    });
    expect(result.errors.amount).toBe('El monto debe ser un número positivo');
  });

  it('validates installments is selected', () => {
    const result = validateLoanForm({
      ...baseValidForm,
      installments: '',
    });
    expect(result.errors.installments).toBe('Selecciona el número de cuotas');
  });

  it('validates empty documentType', () => {
    const result = validateLoanForm({
      ...baseValidForm,
      documentType: '' as any,
    });
    expect(result.errors.documentType).toBe('Selecciona tipo de documento');
  });

  it('validates empty documentNumber', () => {
    const result = validateLoanForm({
      ...baseValidForm,
      documentNumber: '   ',
    });
    expect(result.errors.documentNumber).toBe('Ingresa tu número de documento');
  });

  it('validates empty email', () => {
    const result = validateLoanForm({ ...baseValidForm, email: '' });
    expect(result.errors.email).toBe('Ingresa tu correo electrónico');
  });

  it('validates empty phone', () => {
    const result = validateLoanForm({ ...baseValidForm, phone: '' });
    expect(result.errors.phone).toBe('Ingresa tu número de celular');
  });

  it('validates empty amount', () => {
    const result = validateLoanForm({ ...baseValidForm, amount: '' });
    expect(result.errors.amount).toBe('Ingresa el monto deseado');
  });
});
