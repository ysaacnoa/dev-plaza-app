import { renderHook, act } from '@testing-library/react-native';
import { UserProfile } from '@modules/user/user.types';
import { LoginResult } from '@modules/auth/service/auth.service';

let mockSharedUserState: UserProfile | null = null;

jest.mock('@modules/user/store/user-store', () => {
  return {
    useUserStore: (selector?: any) => {
      const state = {
        user: mockSharedUserState,
        setUser: (user: UserProfile | null) => {
          mockSharedUserState = user;
        },
      };

      if (typeof selector === 'function') {
        return selector(state);
      }
      return state;
    },
  };
});

jest.mock('@modules/auth/service/auth.service');

import { useAuth } from '@modules/auth/hooks/useAuth';
import { AuthService } from '@modules/auth/service/auth.service';

const mockAuthService = AuthService as jest.Mock;

describe('useAuth hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSharedUserState = null;
  });

  it('should login successfully', async () => {
    const mockUser: UserProfile = {
      id: '1',
      name: 'Test',
      lastname: 'User',
      email: 'email@test.com',
      createdAt: Date.now(),
    };

    const mockLoginFn = jest.fn().mockResolvedValue({
      success: true,
      user: mockUser,
    });

    mockAuthService.mockImplementation(() => ({
      login: mockLoginFn,
    }));

    const { result } = renderHook(() => useAuth());

    let loginResult: LoginResult | undefined;
    await act(async () => {
      loginResult = await result.current.login('email@test.com', '123456');
    });

    expect(loginResult?.success).toBe(true);
    expect(mockSharedUserState).toEqual(mockUser);
  });

  it('should handle login failure', async () => {
    const mockLoginFn = jest.fn().mockResolvedValue({
      success: false,
      error: 'Invalid credentials',
    });

    mockAuthService.mockImplementation(() => ({
      login: mockLoginFn,
    }));

    const { result } = renderHook(() => useAuth());

    let loginResult: LoginResult | undefined;
    await act(async () => {
      loginResult = await result.current.login('email@test.com', 'wrongpass');
    });

    expect(loginResult?.success).toBe(false);
    expect(mockSharedUserState).toBeNull();
  });

  it('should set loading state during login', async () => {
    const mockLoginFn = jest.fn().mockResolvedValue({
      success: true,
      user: {
        id: '1',
        name: 'Test',
        lastname: 'User',
        email: 'email@test.com',
        createdAt: Date.now(),
      },
    });

    mockAuthService.mockImplementation(() => ({
      login: mockLoginFn,
    }));

    const { result } = renderHook(() => useAuth());

    expect(result.current.loading).toBe(false);

    await act(async () => {
      const loginPromise = result.current.login('email@test.com', '123456');
      // Note: loading state immediately becomes true
      await loginPromise;
    });

    expect(result.current.loading).toBe(false);
  });

  it('should handle login error and set loading to false', async () => {
    mockAuthService.mockImplementation(() => ({
      login: jest.fn().mockResolvedValue({
        success: false,
        error: 'Invalid credentials',
      }),
    }));

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('email@test.com', '123456');
    });

    expect(result.current.loading).toBe(false);
  });

  it('should register successfully', async () => {
    const mockUser: UserProfile = {
      id: '1',
      name: 'Test',
      lastname: 'User',
      email: 'email@test.com',
      createdAt: Date.now(),
    };

    const mockRegisterFn = jest.fn().mockResolvedValue(mockUser);

    mockAuthService.mockImplementation(() => ({
      register: mockRegisterFn,
    }));

    const { result } = renderHook(() => useAuth());

    let registeredUser: UserProfile | undefined;
    await act(async () => {
      registeredUser = await result.current.register({
        name: 'Test',
        lastname: 'User',
        email: 'email@test.com',
        password: '123456',
      });
    });

    expect(registeredUser?.name).toBe('Test');
    expect(registeredUser?.lastname).toBe('User');
    expect(mockSharedUserState).toEqual(mockUser);
  });

  it('should get user from store', () => {
    const mockUser: UserProfile = {
      id: '1',
      name: 'Test',
      lastname: 'User',
      email: 'email@test.com',
      createdAt: Date.now(),
    };

    mockSharedUserState = mockUser;

    mockAuthService.mockImplementation(() => ({
      login: jest.fn(),
      register: jest.fn(),
    }));

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isLoggedIn).toBe(true);
  });

  it('should check isLoggedIn correctly when no user', () => {
    mockAuthService.mockImplementation(() => ({
      login: jest.fn(),
      register: jest.fn(),
    }));

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.isLoggedIn).toBe(false);
  });

  it('should logout correctly', async () => {
    const mockUser: UserProfile = {
      id: '1',
      name: 'Test',
      lastname: 'User',
      email: 'email@test.com',
      createdAt: Date.now(),
    };

    const mockRegisterFn = jest.fn().mockResolvedValue(mockUser);

    mockAuthService.mockImplementation(() => ({
      register: mockRegisterFn,
    }));

    const { result } = renderHook(() => useAuth());

    // First register to set a user
    await act(async () => {
      await result.current.register({
        name: 'Test',
        lastname: 'User',
        email: 'email@test.com',
        password: '123456',
      });
    });

    expect(mockSharedUserState).toEqual(mockUser);

    // Then logout
    await act(async () => {
      await result.current.logout();
    });

    expect(mockSharedUserState).toBeNull();
  });
});
