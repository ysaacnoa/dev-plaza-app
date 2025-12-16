import { AppStackParamList } from "@navigation/app-stack";
import { AuthStackParamList } from "@navigation/auth-stack";
import { LinkingOptions } from "@react-navigation/native";

type RootStackParamList = AppStackParamList & AuthStackParamList;

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Main: {
        path: '',
        screens: {
          HomeTab: 'home',
          Chat: 'chat',
          Settings: 'settings',
        },
      },
      Login: 'login',
      Register: 'register',
    },
  },
};
