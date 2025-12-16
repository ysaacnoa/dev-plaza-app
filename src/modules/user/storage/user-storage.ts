import { setItem, getItem, removeItem } from 'react-native-hooks';
import { UserProfile, UserCredentials } from '../user.types';

export const USER_PREFIX = 'user_';
export const CREDENTIALS_PREFIX = 'creds_';
const LOGGED_USER_KEY = 'loggedUser';

export async function saveUser(user: UserProfile, password: string) {
  const email = user.email;

  const userKey = `${USER_PREFIX}${email}`;
  const credsKey = `${CREDENTIALS_PREFIX}${email}`;

  await setItem({ key: userKey, value: JSON.stringify(user) });
  await setItem({ key: credsKey, value: JSON.stringify({ email, password }) });
}

export async function loadUser(email: string): Promise<UserProfile | null> {
  const json = await getItem({ key: `${USER_PREFIX}${email}` });
  return json ? JSON.parse(json) : null;
}

export async function loadCredentials(email: string): Promise<UserCredentials | null> {
  const json = await getItem({ key: `${CREDENTIALS_PREFIX}${email}` });
  return json ? JSON.parse(json) : null;
}

export async function clearUser(email: string) {
  await removeItem({ key: `${USER_PREFIX}${email}` });
  await removeItem({ key: `${CREDENTIALS_PREFIX}${email}` });
}

export async function saveLoggedUser(user: UserProfile) {
  await setItem({ key: LOGGED_USER_KEY, value: JSON.stringify(user) });
}

export async function loadLoggedUser(): Promise<UserProfile | null> {
  const json = await getItem({ key: LOGGED_USER_KEY });
  return json ? JSON.parse(json) : null;
}

export async function clearLoggedUser() {
  await removeItem({ key: LOGGED_USER_KEY });
}
