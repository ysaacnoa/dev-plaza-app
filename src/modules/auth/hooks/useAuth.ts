import { useUserStore } from '@modules/user/store/user-store';
import { useCallback, useState, useEffect } from 'react';
import { AuthService } from '../service/auth.service';
import { saveLoggedUser, clearLoggedUser, loadLoggedUser } from '@modules/user/storage/user-storage';

export function useAuth(authService = new AuthService()) {
  const [loading, setLoading] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const { user, setUser } = useUserStore();

  useEffect(() => {
    (async () => {
      const loggedUser = await loadLoggedUser();
      if (loggedUser) {
        setUser(loggedUser);
      }
      setUserLoaded(true);
    })();
  }, [setUser]);

  const register = useCallback(
    async (data: { name: string; lastname: string; email: string; password: string }) => {
      setLoading(true);
      try {
        const newUser = await authService.register(data);
        setUser(newUser);
        await saveLoggedUser(newUser);
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
        await saveLoggedUser(result.user);
        return result;
      } finally {
        setLoading(false);
      }
    },
    [setUser, authService],
  );

  const logout = useCallback(async () => {
    setUser(null);
    await clearLoggedUser();
  }, [setUser]);

  return {
    loading,
    userLoaded,
    user,
    isLoggedIn: !!user,
    register,
    login,
    logout,
  };
}
