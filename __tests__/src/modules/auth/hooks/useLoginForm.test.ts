import { useAuth } from '@modules/auth/hooks/useAuth';
import { useLoginForm } from '@modules/auth/hooks/useLoginForm';
import { renderHook, act } from '@testing-library/react-native';

jest.mock('@modules/auth/hooks/useAuth');

const mockUseAuth = useAuth as jest.Mock;

describe('useLoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with empty values', () => {
    mockUseAuth.mockReturnValue({
      login: jest.fn(),
    });

    const { result } = renderHook(() => useLoginForm());

    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('updates email on handleChangeEmail', () => {
    mockUseAuth.mockReturnValue({
      login: jest.fn(),
    });

    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.handleChangeEmail('test@example.com');
    });

    expect(result.current.email).toBe('test@example.com');
  });

  it('updates password on handleChangePassword', () => {
    mockUseAuth.mockReturnValue({
      login: jest.fn(),
    });

    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.handleChangePassword('password123');
    });

    expect(result.current.password).toBe('password123');
  });

  it('sets error when login fails', async () => {
    mockUseAuth.mockReturnValue({
      login: jest.fn().mockResolvedValue({
        success: false,
        error: 'Invalid credentials',
      }),
    });

    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.handleChangeEmail('test@example.com');
      result.current.handleChangePassword('wrong');
    });

    let submitResult;
    await act(async () => {
      submitResult = await result.current.handleSubmit();
    });

    expect(result.current.error).toBe('Invalid credentials');
    expect(submitResult).toBe(false);
    expect(result.current.loading).toBe(false);
  });

  it('returns true when login succeeds', async () => {
    mockUseAuth.mockReturnValue({
      login: jest.fn().mockResolvedValue({
        success: true,
        user: { id: '1', name: 'Test', lastname: 'User', email: 'test@example.com', createdAt: Date.now() },
      }),
    });

    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.handleChangeEmail('test@example.com');
      result.current.handleChangePassword('password123');
    });

    let submitResult;
    await act(async () => {
      submitResult = await result.current.handleSubmit();
    });

    expect(result.current.error).toBeNull();
    expect(submitResult).toBe(true);
    expect(result.current.loading).toBe(false);
  });
});
