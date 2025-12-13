import { createUser } from '../../user/user.service';
import { loadUser, loadCredentials, saveUser } from '../../user/user-storage';
import { UserProfile } from '../../user/user.types';

export interface LoginResultSuccess {
  success: true;
  user: UserProfile;
}

export interface LoginResultError {
  success: false;
  error: string;
}

export type LoginResult = LoginResultSuccess | LoginResultError;

export interface RegisterData {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export class AuthService {
  async register(data: RegisterData): Promise<UserProfile> {
    const newUser = createUser({
      name: data.name,
      lastname: data.lastname,
      email: data.email,
    });
    await saveUser(newUser, data.password);
    return newUser;
  }

  async login(email: string, password: string): Promise<LoginResult> {
    const creds = await loadCredentials(email);
    const storedUser = await loadUser(email);

    if (!creds || !storedUser) return { success: false, error: 'Usuario no registrado' };
    if (creds.password !== password) return { success: false, error: 'Contraseña incorrecta' };

    return { success: true, user: storedUser };
  }
}
