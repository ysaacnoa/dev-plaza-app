import {
  createStackNavigator,
  StackHeaderProps,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChatScreen } from '@modules/chat';
import { Icon } from '@shared/components';
import { Header, theme } from 'react-native-hooks';

export type ChatStackParamList = {
  ChatMain: undefined;
};

const Stack = createStackNavigator<ChatStackParamList>();

function renderChatHeader(props: StackHeaderProps, paddingTop: number) {
  return (
    <Header
      {...props}
      title="Chat"
      iconChild={
        <Icon
          name="chatbubble"
          size={24}
          color={theme.colors.primary}
        />
      }
      paddingTop={paddingTop}
      canGoBack={false}
    />
  );
}

export function ChatStack() {
  const insets = useSafeAreaInsets();

  const defaultScreenOptions: StackNavigationOptions = {
    cardStyle: { backgroundColor: 'white' },
    header: props => renderChatHeader(props, insets.top),
  };

  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="ChatMain" component={ChatScreen} />
    </Stack.Navigator>
  );
}
