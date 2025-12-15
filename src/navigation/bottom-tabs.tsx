import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeStack } from './home-stack';
import { ChatScreen } from '@modules/chat';
import { SettingsScreen } from '@modules/settings';
import { Icon } from '@shared/components';
import { theme } from 'react-native-hooks';
import { BottomTabParamList, TAB_CONFIG } from './constants/navigation.constants';


const Tab = createBottomTabNavigator<BottomTabParamList>();



export const renderTabIcon = (tabName: keyof BottomTabParamList, color: string) => (
  <Icon
    name={TAB_CONFIG[tabName].icon}
    color={color}
    size={24}
  />
);

export function BottomTabs() {
  const insets = useSafeAreaInsets();

  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarActiveTintColor: theme.colors.primary,
    tabBarInactiveTintColor: theme.colors.textMuted,
    tabBarStyle: {
      paddingBottom: insets.bottom,
      paddingTop: theme.spacing.sm,
      height: 60 + insets.bottom,
      backgroundColor: theme.colors.surface,
      borderTopColor: theme.colors.border,
      borderTopWidth: 1,
    },
    tabBarLabelStyle: {
      fontSize: theme.typography.body?.fontSize || 12,
      marginTop: theme.spacing.xs,
    },
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          ...screenOptions,
          title: TAB_CONFIG.HomeTab.label,
          tabBarIcon: ({ color }) => renderTabIcon('HomeTab', color),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          ...screenOptions,
          title: TAB_CONFIG.Chat.label,
          tabBarIcon: ({ color }) => renderTabIcon('Chat', color),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          ...screenOptions,
          title: TAB_CONFIG.Settings.label,
          tabBarIcon: ({ color }) => renderTabIcon('Settings', color),
        }}
      />
    </Tab.Navigator>
  );
}
