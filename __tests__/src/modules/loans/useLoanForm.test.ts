import { renderHook, act } from '@testing-library/react-native';
import { useLoanForm } from '@modules/loans/hooks/useLoanForm';
import { Alert } from 'react-native';
import { UserProfile } from '@modules/user/user.types';

jest.mock('@modules/user/store/user-store');
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

let mockSharedUserState: UserProfile | null = null;

jest.mock('@modules/user/store/user-store', () => ({
  useUserStore: (selector?: any) => {
    const state = {
      user: mockSharedUserState,
    };
    return selector ? selector(state) : state;
  },
}));

beforeEach(() => {
  mockSharedUserState = {
    dni: '12345678',
    email: 'user@example.com',
    name: 'Juan',
    createdAt: Date.now(),
    id: '1',
    lastname: 'Pérez',
  };
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

  it('updates field and trims value', () => {
    const { result } = renderHook(() => useLoanForm());

    act(() => {
      result.current.updateField('phone', '  912345678  ');
    });

    expect(result.current.form.phone).toBe('912345678');
  });

  it('clears error when updating a field with error', () => {
    const { result } = renderHook(() => useLoanForm());

    // Primero forzamos errores
    act(() => {
      result.current.handleSubmit();
    });

    expect(Object.keys(result.current.errors).length).toBeGreaterThan(0);

    act(() => {
      result.current.updateField('phone', '912345678');
    });

    expect(result.current.errors.phone).toBeUndefined();
  });

  it('validates correctly and sets errors on invalid submit', async () => {
    const { result } = renderHook(() => useLoanForm());

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.errors.phone).toBeDefined();
    expect(result.current.errors.amount).toBeDefined();
    expect(result.current.submitting).toBe(false);
  });

  it('submits successfully when form is valid', async () => {
    const { result } = renderHook(() => useLoanForm());

    // Llenar todos los campos válidos
    act(() => {
      result.current.updateField('phone', '912345678');
      result.current.updateField('amount', '5000');
      result.current.updateField('installments', '12');
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(Alert.alert).toHaveBeenCalledWith('¡Éxito!', expect.any(String));
    expect(result.current.submitting).toBe(false);
  });

  it('shows error alert on submit failure', async () => {
    // Forzar error en console.log o simular excepción
    jest.spyOn(console, 'log').mockImplementation(() => {
      throw new Error('Simulated error');
    });

    const { result } = renderHook(() => useLoanForm());

    act(() => {
      result.current.updateField('phone', '912345678');
      result.current.updateField('amount', '5000');
      result.current.updateField('installments', '12');
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(Alert.alert).toHaveBeenCalledWith('Error', expect.any(String));
  });
});