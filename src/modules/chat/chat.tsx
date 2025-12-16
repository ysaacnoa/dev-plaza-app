import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { theme, BubbleMessage, InputText, Button } from 'react-native-hooks';
import { useChat } from './hooks/useChat';

export function ChatScreen() {
  const headerHeight = useHeaderHeight();
  const { messages, message, onChangeMessage, sendMessage } = useChat();

  return (
    <KeyboardAvoidingView
      testID="chat-screen"
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={headerHeight}
    >
      <FlatList
        testID="chat-list"
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <BubbleMessage
            testID={`chat-message-${item.id}`}
            variant={item.variant}
          >
            {item.text}
          </BubbleMessage>
        )}
      />

      <View testID="chat-input-container" style={styles.inputContainer}>
        <View style={styles.input}>
          <InputText
            testID="chat-input"
            value={message}
            onChangeText={onChangeMessage}
            placeholder="Escribe tu mensaje..."
            clearable
          />
        </View>

        <Button
          testID="chat-send-button"
          label="Send"
          onPress={sendMessage}
          disabled={!message.trim()}
          fit
        />
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  input: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
});
