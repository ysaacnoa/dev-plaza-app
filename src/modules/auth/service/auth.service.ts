import {
  loadCredentials,
  loadUser,
  saveUser,
} from '@modules/user/storage/user-storage';
import { createUser } from '@modules/user/service/user.service';
import { UserProfile } from '@modules/user/user.types';

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
    const [creds, user] = await Promise.all([loadCredentials(email), loadUser(email)]);

    if (!creds || !user) return { success: false, error: 'Usuario no registrado' };

    return creds.password === password
      ? { success: true, user }
      : { success: false, error: 'Contraseña incorrecta' };
  }
}
