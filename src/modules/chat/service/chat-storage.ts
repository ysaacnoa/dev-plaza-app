import { getItem, setItem, removeItem } from 'react-native-hooks';
import { Message } from '../constants/chat.constants';

const CHAT_KEY = 'CHAT_MESSAGES';

export class ChatStorage {
  static async getMessages(): Promise<Message[]> {
    try {
      const json = await getItem({ key: CHAT_KEY });
      if (!json) return [];
      return JSON.parse(json) as Message[];
    } catch (e) {
      console.warn('Error reading chat messages from storage', e);
      return [];
    }
  }

  static async saveMessages(messages: Message[]) {
    try {
      await setItem({ key: CHAT_KEY, value: JSON.stringify(messages) });
    } catch (e) {
      console.warn('Error saving chat messages to storage', e);
    }
  }

  static async clearMessages() {
    try {
      await removeItem({ key: CHAT_KEY });
    } catch (e) {
      console.warn('Error clearing chat messages from storage', e);
    }
  }
}
