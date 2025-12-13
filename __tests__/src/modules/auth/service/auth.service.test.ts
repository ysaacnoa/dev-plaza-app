
import { AuthService } from '@modules/auth/service/auth.service';
import { UserProfile } from '@modules/user/user.types';
import uuid from 'react-native-uuid'
const mockUser: UserProfile = {
  id: uuid.v4(),
  name: 'Juan',
  lastname: 'Pérez',
  email: 'juan@test.com',
  createdAt: Date.now()
};

describe('AuthService', () => {
  it('register guarda y devuelve el usuario', async () => {
    jest.spyOn(require('@modules/user/service/user.service'), 'createUser')
      .mockReturnValue(mockUser);

    jest.spyOn(require('@modules/user/storage/user-storage'), 'saveUser')
      .mockResolvedValue(undefined);

    const service = new AuthService();

    const result = await service.register({
      ...mockUser,
      password: '1234',
    });

    expect(result).toEqual(mockUser);
  });

  it('login falla si el usuario no existe', async () => {
    jest.spyOn(require('@modules/user/storage/user-storage'), 'loadCredentials')
      .mockResolvedValue(null);

    jest.spyOn(require('@modules/user/storage/user-storage'), 'loadUser')
      .mockResolvedValue(null);

    const service = new AuthService();

    const result = await service.login('x@test.com', '1234');

    expect(result).toEqual({
      success: false,
      error: 'Usuario no registrado',
    });
  });

  it('login falla si la contraseña es incorrecta', async () => {
    jest.spyOn(require('@modules/user/storage/user-storage'), 'loadCredentials')
      .mockResolvedValue({ password: 'wrong' });

    jest.spyOn(require('@modules/user/storage/user-storage'), 'loadUser')
      .mockResolvedValue(mockUser);

    const service = new AuthService();

    const result = await service.login('x@test.com', '1234');

    expect(result.success).toBe(false);
  });

  it('login exitoso', async () => {
    jest.spyOn(require('@modules/user/storage/user-storage'), 'loadCredentials')
      .mockResolvedValue({ password: '1234' });

    jest.spyOn(require('@modules/user/storage/user-storage'), 'loadUser')
      .mockResolvedValue(mockUser);

    const service = new AuthService();

    const result = await service.login('x@test.com', '1234');

    expect(result).toEqual({
      success: true,
      user: mockUser,
    });
  });
});
