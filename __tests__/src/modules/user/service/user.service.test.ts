import { createUser } from '@modules/user/service/user.service';

jest.mock('react-native-uuid', () => ({
  v4: jest.fn(() => 'test-uuid-1234'),
}));

describe('User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user with correct properties', () => {
      const userData = {
        name: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
      };

      const user = createUser(userData);

      expect(user.id).toBe('test-uuid-1234');
      expect(user.name).toBe('John');
      expect(user.lastname).toBe('Doe');
      expect(user.email).toBe('john@example.com');
      expect(user.createdAt).toBeDefined();
    });

    it('should trim name and lastname', () => {
      const userData = {
        name: '  John  ',
        lastname: '  Doe  ',
        email: 'john@example.com',
      };

      const user = createUser(userData);

      expect(user.name).toBe('John');
      expect(user.lastname).toBe('Doe');
    });

    it('should lowercase and trim email', () => {
      const userData = {
        name: 'John',
        lastname: 'Doe',
        email: '  JOHN@EXAMPLE.COM  ',
      };

      const user = createUser(userData);

      expect(user.email).toBe('john@example.com');
    });

    it('should have a valid timestamp for createdAt', () => {
      const userData = {
        name: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
      };

      const beforeCreation = Date.now();
      const user = createUser(userData);
      const afterCreation = Date.now();

      expect(user.createdAt).toBeGreaterThanOrEqual(beforeCreation);
      expect(user.createdAt).toBeLessThanOrEqual(afterCreation);
    });
  });
});
