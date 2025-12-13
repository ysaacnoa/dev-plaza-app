import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { LoginScreen, RegisterScreen } from '@modules/auth/screens';
import { NavigationProp } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AuthNavigationProp = NavigationProp<AuthStackParamList>;

const Stack = createStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
