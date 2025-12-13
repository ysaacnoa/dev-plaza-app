import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './auth-stack';
import { AppStack } from './app-stack';
import { useAuth } from '../modules/auth/hooks/useAuth';

export function RootNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
