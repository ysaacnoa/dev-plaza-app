import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeStack } from './home-stack';
import { ChatScreen } from '@modules/chat';
import { SettingsScreen } from '@modules/settings';
import { Icon } from '@shared/components';
import { theme } from 'react-native-hooks';
import { IoniconsIconName } from '@react-native-vector-icons/ionicons';

export type BottomTabParamList = {
  HomeTab: undefined;
  Chat: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const tabConfig: Record<
  keyof BottomTabParamList,
  {
    label: string;
    icon: IoniconsIconName;
  }
> = {
  HomeTab: {
    label: 'Inicio',
    icon: 'home',
  },
  Chat: {
    label: 'Chat',
    icon: 'chatbubble',
  },
  Settings: {
    label: 'Configuración',
    icon: 'settings',
  },
};

export const renderTabIcon = (tabName: keyof BottomTabParamList, color: string) => (
  <Icon
    name={tabConfig[tabName].icon}
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
          title: tabConfig.HomeTab.label,
          tabBarIcon: ({ color }) => renderTabIcon('HomeTab', color),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          ...screenOptions,
          title: tabConfig.Chat.label,
          tabBarIcon: ({ color }) => renderTabIcon('Chat', color),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          ...screenOptions,
          title: tabConfig.Settings.label,
          tabBarIcon: ({ color }) => renderTabIcon('Settings', color),
        }}
      />
    </Tab.Navigator>
  );
}
