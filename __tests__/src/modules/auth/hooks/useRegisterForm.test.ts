import { renderHook, act } from '@testing-library/react-native';
import { useRegisterForm } from '@modules/auth/hooks/useRegisterForm';
import { useAuth } from '@modules/auth/hooks/useAuth';

// Mock del hook useAuth
jest.mock('@modules/auth/hooks/useAuth');

describe('useRegisterForm', () => {
  const mockRegister = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      register: mockRegister,
    });
  });

  it('should initialize with empty values', () => {
    const { result } = renderHook(() => useRegisterForm());

    expect(result.current.name).toBe('');
    expect(result.current.lastname).toBe('');
    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('should update form fields correctly', () => {
    const { result } = renderHook(() => useRegisterForm());

    act(() => result.current.handleChangeName('John'));
    act(() => result.current.handleChangeLastname('Doe'));
    act(() => result.current.handleChangeEmail('john@example.com'));
    act(() => result.current.handleChangePassword('123456'));

    expect(result.current.name).toBe('John');
    expect(result.current.lastname).toBe('Doe');
    expect(result.current.email).toBe('john@example.com');
    expect(result.current.password).toBe('123456');
  });

  it('should call register on handleSubmit with correct data', async () => {
    mockRegister.mockResolvedValueOnce({ id: '1', name: 'John', lastname: 'Doe' });

    const { result } = renderHook(() => useRegisterForm());

    act(() => {
      result.current.handleChangeName('John');
      result.current.handleChangeLastname('Doe');
      result.current.handleChangeEmail('john@example.com');
      result.current.handleChangePassword('123456');
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockRegister).toHaveBeenCalledWith({
      name: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      password: '123456',
    });
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('should handle errors from register with error message', async () => {
    mockRegister.mockRejectedValueOnce(new Error('Failed to register'));

    const { result } = renderHook(() => useRegisterForm());

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.error).toBe('Failed to register');
    expect(result.current.loading).toBe(false);
  });

  it('should handle errors with unknown error message', async () => {
    mockRegister.mockRejectedValueOnce({});

    const { result } = renderHook(() => useRegisterForm());

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.error).toBe('Error desconocido');
    expect(result.current.loading).toBe(false);
  });

  it('should clear error on new submit', async () => {
    mockRegister
      .mockRejectedValueOnce(new Error('First error'))
      .mockResolvedValueOnce({ id: '1' });

    const { result } = renderHook(() => useRegisterForm());

    // First submission fails
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(result.current.error).toBe('First error');

    // Second submission succeeds
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(result.current.error).toBeNull();
  });
});
