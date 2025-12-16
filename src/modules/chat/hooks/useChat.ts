import { useAuth } from '@modules/auth/hooks/useAuth';
import { useEffect, useState, useCallback } from 'react';
import { DEFAULT_MESSAGES, type Message } from '../constants/chat.constants';
import { ChatStorage } from '../service/chat-storage';

export function useChat() {
  const { isLoggedIn } = useAuth();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(DEFAULT_MESSAGES);


  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        const stored = await ChatStorage.getMessages();
        setMessages(stored.length ? stored : DEFAULT_MESSAGES);
      } else {
        setMessages(DEFAULT_MESSAGES);
      }
    })();
  }, [isLoggedIn]);

  const onChangeMessage = useCallback((text: string) => {
    setMessage(text);
  }, []);

  const sendMessage = useCallback(async () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      variant: 'me',
    };

    const updated = [...messages, newMessage];
    setMessages(updated);
    setMessage('');

    await ChatStorage.saveMessages(updated);
  }, [message, messages]);

  return {
    message,
    messages,
    onChangeMessage,
    sendMessage,
  };
}
