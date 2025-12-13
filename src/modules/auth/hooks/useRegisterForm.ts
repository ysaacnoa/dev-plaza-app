import { useState } from 'react';
import { useAuth } from './useAuth';

export function useRegisterForm() {
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChangeName = (value: string) => setName(value);
  const handleChangeLastname = (value: string) => setLastname(value);
  const handleChangeEmail = (value: string) => setEmail(value);
  const handleChangePassword = (value: string) => setPassword(value);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await register({ name, lastname, email, password });
    } catch (err: any ) {
      setError(err.message ?? 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    lastname,
    email,
    password,
    error,
    loading,
    handleChangeName,
    handleChangeLastname,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
  };
}
