import { useState } from 'react';
import { useAuth } from './useAuth';


export function useLoginForm() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChangeEmail = (value: string) => setEmail(value);
  const handleChangePassword = (value: string) => setPassword(value);

  const handleSubmit = async (): Promise<boolean> => {
    setLoading(true);
    setError(null);

    const result = await login(email, password);

    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return false;
    }

    return true;
  };

  return {
    email,
    password,
    error,
    loading,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
  };
}
