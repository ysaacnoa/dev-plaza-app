import { useAuth } from '@modules/auth/hooks/useAuth';
import {
  DEFAULT_MESSAGES,
  Message,
} from '@modules/chat/constants/chat.constants';
import { useChat } from '@modules/chat/hooks/useChat';
import { ChatStorage } from '@modules/chat/service/chat-storage';
import { renderHook, act, waitFor } from '@testing-library/react-native';

jest.mock('@modules/auth/hooks/useAuth');
jest.mock('@modules/chat/service/chat-storage');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockChatStorage = ChatStorage as jest.Mocked<typeof ChatStorage>;

describe('useChat', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAuth.mockReturnValue({
      loading: false,
      userLoaded: true,
      user: {
        id: '1',
        name: 'Test',
        lastname: 'User',
        email: 'test@example.com',
        createdAt: Date.now(),
      },
      isLoggedIn: true,
      register: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
    });

    mockChatStorage.getMessages.mockResolvedValue([]);
    mockChatStorage.saveMessages.mockResolvedValue(undefined);
  });

  it('should load default messages if not logged in', async () => {
    mockUseAuth.mockReturnValue({
      loading: false,
      userLoaded: true,
      user: null,
      isLoggedIn: false,
      register: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
    });

    const { result } = renderHook(() => useChat());

    await waitFor(() => {
      expect(result.current.messages).toEqual(DEFAULT_MESSAGES);
    });
  });

  it('should load messages from storage if logged in', async () => {
    const storedMessages: Message[] = [
      { id: '1', text: 'Hi', variant: 'reminder' },
    ];

    mockChatStorage.getMessages.mockResolvedValue(storedMessages);

    const { result } = renderHook(() => useChat());

    await waitFor(() => {
      expect(result.current.messages).toEqual(storedMessages);
      expect(mockChatStorage.getMessages).toHaveBeenCalled();
    });
  });

  it('should send a new message and save to storage', async () => {
    const { result } = renderHook(() => useChat());

    await waitFor(() => {
      expect(result.current.messages).toEqual(DEFAULT_MESSAGES);
    });

    act(() => {
      result.current.onChangeMessage('Hello world');
    });

    await act(async () => {
      await result.current.sendMessage();
    });

    expect(result.current.messages).toHaveLength(DEFAULT_MESSAGES.length + 1);
    expect(result.current.messages.at(-1)?.text).toBe('Hello world');
    expect(result.current.message).toBe('');
    expect(mockChatStorage.saveMessages).toHaveBeenCalledWith(
      result.current.messages,
    );
  });

  it('should not send empty message', async () => {
    const { result } = renderHook(() => useChat());

    await waitFor(() => {
      expect(result.current.messages).toEqual(DEFAULT_MESSAGES);
    });

    await act(async () => {
      await result.current.sendMessage();
    });

    expect(mockChatStorage.saveMessages).not.toHaveBeenCalled();
    expect(result.current.messages).toEqual(DEFAULT_MESSAGES);
  });
});
