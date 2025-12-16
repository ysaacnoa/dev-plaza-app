import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './auth-stack';
import { AppStack } from './app-stack';
import { useAuth } from '@modules/auth/hooks/useAuth';
import { linking } from './constants/linking';
import { useNavigationLoading } from './hooks/useNavigationLoading';

export function RootNavigator() {
  const { user } = useAuth();
  const { navigationRef, handleStateChange, handleReady } = useNavigationLoading();

  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      onReady={handleReady}
      onStateChange={handleStateChange}
    >
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
