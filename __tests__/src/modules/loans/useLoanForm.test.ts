import { renderHook, act } from '@testing-library/react-native';
import { useLoanForm } from '@modules/loans/hooks/useLoanForm';
import { Alert } from 'react-native';
import { UserProfile } from '@modules/user/user.types';
import { validateLoanForm } from '@modules/loans/validator/loan-form.validator';

jest.mock('@modules/loans/validator/loan-form.validator', () => ({
  validateLoanForm: jest.fn(),
}));

jest.mock('@modules/user/store/user-store', () => ({
  useUserStore: (selector?: any) => {
    const state = { user: mockSharedUserState };
    return selector ? selector(state) : state;
  },
}));

jest.mock('react-native', () => ({
  Alert: { alert: jest.fn() },
}));

let mockSharedUserState: UserProfile | null = null;

beforeEach(() => {
  mockSharedUserState = {
    dni: '12345678',
    email: 'user@example.com',
    name: 'Juan',
    lastname: 'Pérez',
    id: '1',
    createdAt: Date.now(),
  };

  (validateLoanForm as jest.Mock).mockImplementation(() => ({
    isValid: true,
    errors: {},
  }));

  jest.clearAllMocks();
});

describe('useLoanForm', () => {
  it('initializes with user data from store', () => {
    const { result } = renderHook(() => useLoanForm());

    expect(result.current.form.documentType).toBe('DNI');
    expect(result.current.form.documentNumber).toBe('12345678');
    expect(result.current.form.email).toBe('user@example.com');
    expect(result.current.form.names).toBe('Juan');
    expect(result.current.form.lastnames).toBe('Pérez');
    expect(result.current.form.phone).toBe('');
    expect(result.current.form.amount).toBe('');
    expect(result.current.form.installments).toBe('');
  });

  it('initializes with empty strings when user is null', () => {
    mockSharedUserState = null;
    const { result } = renderHook(() => useLoanForm());

    expect(result.current.form.documentType).toBe('DNI');
    expect(result.current.form.documentNumber).toBe('');
    expect(result.current.form.email).toBe('');
    expect(result.current.form.names).toBe('');
    expect(result.current.form.lastnames).toBe('');
    expect(result.current.form.phone).toBe('');
    expect(result.current.form.amount).toBe('');
    expect(result.current.form.installments).toBe('');
  });

  it('updates field and trims value', () => {
    const { result } = renderHook(() => useLoanForm());

    act(() => result.current.updateField('phone', '  912345678  '));
    expect(result.current.form.phone).toBe('912345678');
  });

  it('clears error when updating a field with error', async () => {
    // Forzamos error en validateLoanForm
    (validateLoanForm as jest.Mock).mockReturnValueOnce({
      isValid: false,
      errors: { phone: 'Error en teléfono' },
    });

    const { result } = renderHook(() => useLoanForm());

    await act(async () => result.current.handleSubmit());

    expect(Object.keys(result.current.errors).length).toBeGreaterThan(0);

    act(() => result.current.updateField('phone', '912345678'));

    expect(result.current.errors.phone).toBeUndefined();
  });

  it('validates correctly and sets errors on invalid submit', async () => {
    (validateLoanForm as jest.Mock).mockReturnValueOnce({
      isValid: false,
      errors: { phone: 'Error en teléfono', amount: 'Error en monto' },
    });

    const { result } = renderHook(() => useLoanForm());

    await act(async () => result.current.handleSubmit());

    expect(result.current.errors.phone).toBeDefined();
    expect(result.current.errors.amount).toBeDefined();
    expect(result.current.submitting).toBe(false);
    expect(result.current.hasErrors).toBe(true);
  });

  it('submits successfully when form is valid', async () => {
    const { result } = renderHook(() => useLoanForm());

    act(() => {
      result.current.updateField('phone', '912345678');
      result.current.updateField('amount', '5000');
      result.current.updateField('installments', '12');
    });

    (validateLoanForm as jest.Mock).mockReturnValueOnce({
      isValid: true,
      errors: {},
    });

    await act(async () => result.current.handleSubmit());

    expect(Alert.alert).toHaveBeenCalledWith('¡Éxito!', expect.any(String));
    expect(result.current.submitting).toBe(false);
    expect(result.current.hasErrors).toBe(false);
  });

  it('shows error alert on submit failure', async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {
      throw new Error('Simulated error');
    });

    const { result } = renderHook(() => useLoanForm());

    act(() => {
      result.current.updateField('phone', '912345678');
      result.current.updateField('amount', '5000');
      result.current.updateField('installments', '12');
    });

    await act(async () => result.current.handleSubmit());

    expect(Alert.alert).toHaveBeenCalledWith('Error', expect.any(String));
    expect(result.current.submitting).toBe(false);
  });

  it('updateField on field without previous error does not touch errors', () => {
    const { result } = renderHook(() => useLoanForm());
    act(() => result.current.updateField('phone', '12345'));
    expect(result.current.errors).toEqual({});
  });

  it('handleSubmit does not crash when validation fails but errors is empty', async () => {
    (validateLoanForm as jest.Mock).mockReturnValueOnce({
      isValid: false,
      errors: {},
    });

    const { result } = renderHook(() => useLoanForm());

    await act(async () => result.current.handleSubmit());

    expect(result.current.submitting).toBe(false);
    expect(result.current.hasErrors).toBe(false);
    expect(result.current.errors).toEqual({});
  });

  it('handleSubmit sets hasErrors correctly when validation fails', async () => {
    (validateLoanForm as jest.Mock).mockReturnValueOnce({
      isValid: false,
      errors: { names: 'Error en nombres' },
    });

    const { result } = renderHook(() => useLoanForm());
    await act(async () => result.current.handleSubmit());

    expect(result.current.hasErrors).toBe(true);
  });

  it('updateField trims empty spaces and updates form', () => {
    const { result } = renderHook(() => useLoanForm());
    act(() => result.current.updateField('names', '   '));
    expect(result.current.form.names).toBe('');
  });

  it('updateField clears error on all fields when error exists', async () => {
    (validateLoanForm as jest.Mock).mockReturnValueOnce({
      isValid: false,
      errors: {
        documentNumber: 'Error',
        email: 'Error',
        phone: 'Error',
        names: 'Error',
        lastnames: 'Error',
        amount: 'Error',
        installments: 'Error',
      },
    });

    const { result } = renderHook(() => useLoanForm());

    await act(async () => result.current.handleSubmit());

    const fields: (keyof typeof result.current.form)[] = [
      'documentType',
      'documentNumber',
      'email',
      'phone',
      'names',
      'lastnames',
      'amount',
      'installments',
    ];

    fields.forEach(field => {
      act(() => result.current.updateField(field, 'test'));
      expect(result.current.errors[field]).toBeUndefined();
    });
  });
});
