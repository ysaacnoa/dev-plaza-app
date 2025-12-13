import { useUserStore } from '@modules/user/user-store';
import { useCallback, useState } from 'react';
import { AuthService } from '../service/autn.service';

const authService = new AuthService();

export function useAuth() {
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
      } finally {
        setLoading(false);
      }
    },
    [setUser],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const result = await authService.login(email, password);
        if (!result.success) return result;

        setUser(result.user ?? null);
        return result;
      } finally {
        setLoading(false);
      }
    },
    [setUser],
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
