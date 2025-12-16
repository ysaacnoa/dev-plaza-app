import { useAuth } from '@modules/auth/hooks/useAuth';
import { useEffect, useState, useCallback } from 'react';
import { DEFAULT_MESSAGES, type Message } from '../constants/chat.constants';

export function useChat() {
  const { isLoggedIn } = useAuth();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(DEFAULT_MESSAGES);

  const onChangeMessage = useCallback((text: string) => {
    setMessage(text);
  }, []);

  const sendMessage = useCallback(() => {
    if (!message.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        text: message,
        variant: 'me',
      },
    ]);

    setMessage('');
  }, [message]);

  useEffect(() => {
    if (!isLoggedIn) {
      setMessages(DEFAULT_MESSAGES);
      setMessage('');
    }
  }, [isLoggedIn]);

  return {
    message,
    messages,
    onChangeMessage,
    sendMessage,
  };
}
