import { useUserStore } from '@modules/user/store/user-store';
import { useCallback, useState } from 'react';
import { AuthService } from '../service/auth.service';

export function useAuth(authService = new AuthService()) {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUserStore();

  const register = useCallback(
    async (data: {
      name: string;
      lastname: string;
      email: string;
      password: string;
    }) => {
      setLoading(true);
      try {
        const newUser = await authService.register(data);
        setUser(newUser);
        return newUser; 
      } finally {
        setLoading(false);
      }
    },
    [setUser, authService],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const result = await authService.login(email, password);

        if (!result.success) return result;

        setUser(result.user);
        return result;
      } finally {
        setLoading(false);
      }
    },
    [setUser, authService],
  );

  const logout = useCallback(async () => {
    setUser(null);
  }, [setUser]);

  return {
    loading,
    user,
    isLoggedIn: !!user,
    register,
    login,
    logout,
  };
}
