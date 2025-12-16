import { clearLoggedUser, loadLoggedUser } from '@modules/user/storage/user-storage';
import { useUserStore } from '@modules/user/store/user-store';

jest.mock('../../../../../src/modules/user/storage/user-storage');

describe('useUserStore', () => {
  const mockUser = {
    id: '1',
    name: 'Test',
    lastname: 'User',
    email: 'test@example.com',
    createdAt: Date.now(),
  };

  beforeEach(() => {
    // Resetear estado antes de cada test
    useUserStore.setState({ user: null });
    jest.clearAllMocks();
  });

  it('should initialize with null user', () => {
    const state = useUserStore.getState();
    expect(state.user).toBeNull();
  });

  it('should set user correctly', () => {
    useUserStore.getState().setUser(mockUser);
    const state = useUserStore.getState();
    expect(state.user).toEqual(mockUser);
  });

  it('should clear user by setting to null', () => {
    useUserStore.getState().setUser(mockUser);
    expect(useUserStore.getState().user).toEqual(mockUser);

    useUserStore.getState().setUser(null);
    expect(useUserStore.getState().user).toBeNull();
  });

  it('should update user correctly', () => {
    useUserStore.getState().setUser(mockUser);
    const updatedUser = { ...mockUser, name: 'Updated' };
    useUserStore.getState().setUser(updatedUser);

    const state = useUserStore.getState();
    expect(state.user?.name).toBe('Updated');
  });

  it('should call clearLoggedUser and set user to null on logout', async () => {
    const clearMock = clearLoggedUser as jest.Mock;
    clearMock.mockResolvedValue(undefined);

    useUserStore.getState().setUser(mockUser);
    await useUserStore.getState().logout();

    expect(useUserStore.getState().user).toBeNull();
    expect(clearMock).toHaveBeenCalled();
  });

  it('should load active user from storage', async () => {
    const loadMock = loadLoggedUser as jest.Mock;
    loadMock.mockResolvedValue(mockUser);

    await useUserStore.getState().loadActiveUser();
    expect(useUserStore.getState().user).toEqual(mockUser);
    expect(loadMock).toHaveBeenCalled();
  });

  it('should not set user if loadActiveUser returns null', async () => {
    const loadMock = loadLoggedUser as jest.Mock;
    loadMock.mockResolvedValue(null);

    await useUserStore.getState().loadActiveUser();
    expect(useUserStore.getState().user).toBeNull();
    expect(loadMock).toHaveBeenCalled();
  });
});
