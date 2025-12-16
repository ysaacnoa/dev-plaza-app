
import { Message } from '@modules/chat/constants/chat.constants';
import { ChatStorage } from '@modules/chat/service/chat-storage';
import { getItem, setItem, removeItem } from 'react-native-hooks';

jest.mock('react-native-hooks', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('ChatStorage', () => {
  const mockMessages: Message[] = [
    { id: '1', text: 'Hello', variant: 'me' },
    { id: '2', text: 'Hi', variant: 'reminder' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get messages from storage', async () => {
    (getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockMessages));

    const messages = await ChatStorage.getMessages();

    expect(getItem).toHaveBeenCalledWith({ key: 'CHAT_MESSAGES' });
    expect(messages).toEqual(mockMessages);
  });

  it('should return empty array if storage is empty', async () => {
    (getItem as jest.Mock).mockResolvedValue(null);

    const messages = await ChatStorage.getMessages();

    expect(messages).toEqual([]);
  });

  it('should save messages to storage', async () => {
    await ChatStorage.saveMessages(mockMessages);

    expect(setItem).toHaveBeenCalledWith({
      key: 'CHAT_MESSAGES',
      value: JSON.stringify(mockMessages),
    });
  });

  it('should clear messages from storage', async () => {
    await ChatStorage.clearMessages();

    expect(removeItem).toHaveBeenCalledWith({ key: 'CHAT_MESSAGES' });
  });

  it('should handle invalid JSON gracefully when getting messages', async () => {
    (getItem as jest.Mock).mockResolvedValue('invalid json');

    const messages = await ChatStorage.getMessages();

    expect(messages).toEqual([]);
  });
});
