import { setItem, getItem, removeItem } from 'react-native-hooks';
import { UserProfile, UserCredentials } from '../user.types';

export const USER_PREFIX = 'user_';
export const CREDENTIALS_PREFIX = 'creds_';

export async function saveUser(user: UserProfile, password: string) {
  const email = user.email;

  const userKey = `${USER_PREFIX}${email}`;
  const credsKey = `${CREDENTIALS_PREFIX}${email}`;

  console.log('[SAVE USER] key:', userKey, 'value:', JSON.stringify(user));
  await setItem({ key: userKey, value: JSON.stringify(user) });

  console.log('[SAVE CREDS] key:', credsKey, 'value:', JSON.stringify({ email, password }));
  await setItem({ key: credsKey, value: JSON.stringify({ email, password }) });
}

export async function loadUser(email: string): Promise<UserProfile | null> {
  const userKey = `${USER_PREFIX}${email}`;
  const json = await getItem({ key: userKey });
  console.log('[LOAD USER] key:', userKey, 'value:', json);
  return json ? JSON.parse(json) : null;
}

export async function loadCredentials(email: string): Promise<UserCredentials | null> {
  const credsKey = `${CREDENTIALS_PREFIX}${email}`;
  const json = await getItem({ key: credsKey });
  console.log('[LOAD CREDS] key:', credsKey, 'value:', json);
  return json ? JSON.parse(json) : null;
}

export async function clearUser(email: string) {
  await removeItem({ key: `${USER_PREFIX}${email}` });
  await removeItem({ key: `${CREDENTIALS_PREFIX}${email}` });
}
