import { UserProfile } from './user.types';
import uuid from 'react-native-uuid';

export function createUser(data: { name: string; lastname: string; email: string }): UserProfile {
  return {
    id: uuid.v4(),
    name: data.name.trim(),
    lastname: data.lastname.trim(),
    email: data.email.trim().toLowerCase(),
    createdAt: Date.now(),
  };
}
