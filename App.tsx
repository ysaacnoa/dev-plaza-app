import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, useColorScheme } from 'react-native';
import { RootNavigator } from './src/navigation/root-navigation';
import { LoadingProvider } from '@navigation/components/loading-context';

export default function App() {
  const isDark = useColorScheme() === 'dark';

  return (
    <LoadingProvider>
      <SafeAreaProvider>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <RootNavigator />
      </SafeAreaProvider>
    </LoadingProvider>
  );
}
