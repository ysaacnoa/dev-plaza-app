import {
  saveUser,
  loadUser,
  loadCredentials,
  clearUser,
  USER_PREFIX,
  CREDENTIALS_PREFIX,
} from '@modules/user/storage/user-storage';
import { UserProfile } from '@modules/user/user.types';

jest.mock('react-native-hooks', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

import { setItem, getItem, removeItem } from 'react-native-hooks';

const mockSetItem = setItem as jest.Mock;
const mockGetItem = getItem as jest.Mock;
const mockRemoveItem = removeItem as jest.Mock;

describe('User Storage', () => {
  const mockUser: UserProfile = {
    id: '1',
    name: 'Test',
    lastname: 'User',
    email: 'test@example.com',
    createdAt: Date.now(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveUser', () => {
    it('should save user and credentials', async () => {
      await saveUser(mockUser, 'password123');

      expect(mockSetItem).toHaveBeenCalledTimes(2);

      // Check user save
      const userCall = mockSetItem.mock.calls[0][0];
      expect(userCall.key).toBe(`${USER_PREFIX}${mockUser.email}`);
      expect(userCall.value).toBe(JSON.stringify(mockUser));

      // Check credentials save
      const credsCall = mockSetItem.mock.calls[1][0];
      expect(credsCall.key).toBe(`${CREDENTIALS_PREFIX}${mockUser.email}`);
      expect(credsCall.value).toBe(
        JSON.stringify({ email: mockUser.email, password: 'password123' })
      );
    });
  });

  describe('loadUser', () => {
    it('should load user from storage', async () => {
      mockGetItem.mockResolvedValue(JSON.stringify(mockUser));

      const user = await loadUser(mockUser.email);

      expect(mockGetItem).toHaveBeenCalledWith({ key: `${USER_PREFIX}${mockUser.email}` });
      expect(user).toEqual(mockUser);
    });

    it('should return null when user not found', async () => {
      mockGetItem.mockResolvedValue(null);

      const user = await loadUser('notfound@example.com');

      expect(user).toBeNull();
    });
  });

  describe('loadCredentials', () => {
    it('should load credentials from storage', async () => {
      const credentials = { email: mockUser.email, password: 'password123' };
      mockGetItem.mockResolvedValue(JSON.stringify(credentials));

      const result = await loadCredentials(mockUser.email);

      expect(mockGetItem).toHaveBeenCalledWith({ key: `${CREDENTIALS_PREFIX}${mockUser.email}` });
      expect(result).toEqual(credentials);
    });

    it('should return null when credentials not found', async () => {
      mockGetItem.mockResolvedValue(null);

      const result = await loadCredentials('notfound@example.com');

      expect(result).toBeNull();
    });
  });

  describe('clearUser', () => {
    it('should remove user and credentials from storage', async () => {
      await clearUser(mockUser.email);

      expect(mockRemoveItem).toHaveBeenCalledTimes(2);
      expect(mockRemoveItem).toHaveBeenCalledWith({ key: `${USER_PREFIX}${mockUser.email}` });
      expect(mockRemoveItem).toHaveBeenCalledWith({ key: `${CREDENTIALS_PREFIX}${mockUser.email}` });
    });
  });
});
