import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabs } from './bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export type AppStackParamList = {
  Main: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <SafeAreaProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={BottomTabs} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
