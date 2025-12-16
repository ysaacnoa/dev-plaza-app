jest.mock('@modules/auth/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

import { useAuth } from '@modules/auth/hooks/useAuth';
import { DEFAULT_MESSAGES } from '@modules/chat/constants/chat.constants';
import { useChat } from '@modules/chat/hooks/useChat';
import { renderHook } from '@testing-library/react-native';
import { act } from 'react';

describe('useChat', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with default messages', () => {
    (useAuth as jest.Mock).mockReturnValue({ isLoggedIn: true });

    const { result } = renderHook(() => useChat());

    expect(result.current.messages).toEqual(DEFAULT_MESSAGES);
    expect(result.current.message).toBe('');
  });

  it('updates message when onChangeMessage is called', () => {
    (useAuth as jest.Mock).mockReturnValue({ isLoggedIn: true });

    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.onChangeMessage('Hola');
    });

    expect(result.current.message).toBe('Hola');
  });

  it('adds message and clears input on sendMessage', () => {
    (useAuth as jest.Mock).mockReturnValue({ isLoggedIn: true });

    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.onChangeMessage('Hola mundo');
    });

    act(() => {
      result.current.sendMessage();
    });

    expect(result.current.messages).toHaveLength(DEFAULT_MESSAGES.length + 1);
    expect(result.current.message).toBe('');
  });

  it('resets messages when user logs out', () => {
    let isLoggedIn = true;

    (useAuth as jest.Mock).mockImplementation(() => ({ isLoggedIn }));

    type Props = {};

    const { result, rerender } = renderHook((_props: Props) => useChat(), {
      initialProps: {},
    });

    act(() => {
      result.current.onChangeMessage('Mensaje privado');
    });

    act(() => {
      result.current.sendMessage();
    });

    expect(result.current.messages.length).toBe(DEFAULT_MESSAGES.length + 1);

    act(() => {
      isLoggedIn = false;
      rerender({});
    });

    expect(result.current.messages).toEqual(DEFAULT_MESSAGES);
    expect(result.current.message).toBe('');
  });
});
