import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { theme, BubbleMessage, InputText, Button } from 'react-native-hooks';

type Message = {
  id: string;
  text: string;
  variant: 'me' | 'reminder';
};

export function ChatScreen() {
  const headerHeight = useHeaderHeight();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Mi conversación', variant: 'me' },
    { id: '2', text: 'Mi conversación', variant: 'me' },
    { id: '3', text: 'Mi conversación', variant: 'me' },
    { id: '4', text: 'Respuesta del chatbot', variant: 'reminder' },
    { id: '5', text: 'Mi conversación', variant: 'me' },
  ]);

  const handleSend = () => {
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
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={headerHeight}
    >
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <BubbleMessage variant={item.variant}>{item.text}</BubbleMessage>
        )}
      />

      <View style={styles.inputContainer}>
        <InputText
          value={message}
          onChangeText={setMessage}
          placeholder="Escribe aquí"
          clearable
          style={styles.input}
        />

        <View style={styles.sendButton}>
          <Button
            label="Send"
            onPress={handleSend}
            disabled={!message.trim()}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  list: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  input: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  sendButton: {
    width: 64,
  },
});
