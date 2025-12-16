import {
  createStackNavigator,
  StackHeaderProps,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SettingsScreen } from '@modules/settings';
import { Icon } from '@shared/components';
import { Header, theme } from 'react-native-hooks';

export type SettingsStackParamList = {
  SettingsMain: undefined;
};

const Stack = createStackNavigator<SettingsStackParamList>();

function renderSettingsHeader(props: StackHeaderProps, paddingTop: number) {
  return (
    <Header
      {...props}
      title="Configuración"
      iconChild={
        <Icon
          name="settings"
          size={24}
          color={theme.colors.primary}
        />
      }
      paddingTop={paddingTop}
      canGoBack={false}
    />
  );
}

export function SettingsStack() {
  const insets = useSafeAreaInsets();

  const defaultScreenOptions: StackNavigationOptions = {
    cardStyle: { backgroundColor: 'white' },
    header: props => renderSettingsHeader(props, insets.top),
  };

  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="SettingsMain" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
