import { render, fireEvent } from '@testing-library/react-native';

import { useHeaderHeight } from '@react-navigation/elements';
import { useChat } from '@modules/chat/hooks/useChat';
import { ChatScreen } from '@modules/chat';

jest.mock('../../../../src/modules/chat/hooks/useChat');
jest.mock('@react-navigation/elements', () => ({
  ...jest.requireActual('@react-navigation/elements'),
  useHeaderHeight: jest.fn(),
}));

jest.mock('react-native-hooks', () => {
  const React = require('react');
  const { Text, TextInput, TouchableOpacity } = require('react-native');

  return {
    theme: {
      colors: {
        surface: '#fff',
      },
      spacing: {
        sm: 4,
        md: 8,
        lg: 16,
        xl: 24,
      },
    },

    BubbleMessage: ({ children }: any) => (
      <Text>{children}</Text>
    ),

    InputText: ({ value, onChangeText, testID }: any) => (
      <TextInput
        testID={testID}
        value={value}
        onChangeText={onChangeText}
      />
    ),

    Button: ({ onPress, disabled, testID, label }: any) => (
      <TouchableOpacity
        testID={testID}
        onPress={onPress}
        accessibilityState={{ disabled }}
      >
        <Text>{label}</Text>
      </TouchableOpacity>
    ),
  };
});


const mockUseChat = useChat as jest.Mock;

describe('ChatScreen', () => {
  beforeEach(() => {
    (useHeaderHeight as jest.Mock).mockReturnValue(56);

    mockUseChat.mockReturnValue({
      messages: [
        { id: '1', text: 'Hola', variant: 'reminder' },
        { id: '2', text: 'Hey', variant: 'me' },
      ],
      message: '',
      onChangeMessage: jest.fn(),
      sendMessage: jest.fn(),
    });
  });

  it('renders chat screen correctly', () => {
    const { getByTestId } = render(<ChatScreen />);

    expect(getByTestId('chat-screen')).toBeTruthy();
  });

  it('renders messages from hook', () => {
    const { getByText } = render(<ChatScreen />);

    expect(getByText('Hola')).toBeTruthy();
    expect(getByText('Hey')).toBeTruthy();
  });

  it('calls onChangeMessage when typing', () => {
    const onChangeMessage = jest.fn();

    mockUseChat.mockReturnValueOnce({
      ...mockUseChat(),
      onChangeMessage,
    });

    const { getByTestId } = render(<ChatScreen />);
    fireEvent.changeText(getByTestId('chat-input'), 'Hola');

    expect(onChangeMessage).toHaveBeenCalledWith('Hola');
  });

  it('send button is disabled when message is empty', () => {
  const { getByTestId } = render(<ChatScreen />);

  const button = getByTestId('chat-send-button');

  expect(button.props.accessibilityState.disabled).toBe(true);
});

  it('send button is enabled when message has text', () => {
  mockUseChat.mockReturnValue({
    messages: [
      { id: '1', text: 'Hola', variant: 'me' },
      { id: '2', text: 'Hey', variant: 'reminder' },
    ],
    message: 'Hola',
    onChangeMessage: jest.fn(),
    sendMessage: jest.fn(),
  });

  const { getByTestId } = render(<ChatScreen />);

  const button = getByTestId('chat-send-button');

  expect(button.props.accessibilityState.disabled).toBe(false);
});

  it('calls sendMessage when pressing send button', () => {
  const sendMessage = jest.fn();

  mockUseChat.mockReturnValue({
    messages: [
      { id: '1', text: 'Hola', variant: 'me' },
      { id: '2', text: 'Hey', variant: 'reminder' },
    ],
    message: 'Hola',
    onChangeMessage: jest.fn(),
    sendMessage,
  });

  const { getByTestId } = render(<ChatScreen />);

  fireEvent.press(getByTestId('chat-send-button'));

  expect(sendMessage).toHaveBeenCalled();
});
});
