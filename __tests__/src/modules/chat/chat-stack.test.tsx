import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ChatStack } from '@navigation/chat-stack';

jest.mock('@modules/chat', () => ({
  ChatScreen: () => <></>,
}));

describe('ChatStack', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <ChatStack />
        </NavigationContainer>
      </SafeAreaProvider>
    );
    expect(toJSON()).toBeTruthy();
  });
});
