import { useUserStore } from '@modules/user/store/user-store';

describe('useUserStore', () => {
  beforeEach(() => {
    // Reset the store state before each test
    useUserStore.setState({ user: null });
  });

  it('should initialize with null user', () => {
    const state = useUserStore.getState();
    expect(state.user).toBeNull();
  });

  it('should set user correctly', () => {
    const mockUser = {
      id: '1',
      name: 'Test',
      lastname: 'User',
      email: 'test@example.com',
      createdAt: Date.now(),
    };

    useUserStore.getState().setUser(mockUser);

    const state = useUserStore.getState();
    expect(state.user).toEqual(mockUser);
  });

  it('should clear user by setting to null', () => {
    const mockUser = {
      id: '1',
      name: 'Test',
      lastname: 'User',
      email: 'test@example.com',
      createdAt: Date.now(),
    };

    useUserStore.getState().setUser(mockUser);
    expect(useUserStore.getState().user).toEqual(mockUser);

    useUserStore.getState().setUser(null);
    expect(useUserStore.getState().user).toBeNull();
  });

  it('should update user correctly', () => {
    const mockUser = {
      id: '1',
      name: 'Test',
      lastname: 'User',
      email: 'test@example.com',
      createdAt: Date.now(),
    };

    useUserStore.getState().setUser(mockUser);

    const updatedUser = {
      ...mockUser,
      name: 'Updated',
    };

    useUserStore.getState().setUser(updatedUser);

    const state = useUserStore.getState();
    expect(state.user?.name).toBe('Updated');
  });
});
