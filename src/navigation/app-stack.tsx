import { HomeScreen } from '@modules/home/screens';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

export type AppStackParamList = {
  Home: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
