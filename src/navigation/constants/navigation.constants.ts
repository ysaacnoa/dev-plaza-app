import { IconName } from "@shared/components";

export const FIXED_TITLES: Partial<Record<keyof HomeStackParamList, string>> = {
  Home: 'Inicio',
  Cards: 'Tarjetas',
  Movements: 'Movimientos',
  Loans: 'Préstamos',
  Services: 'Servicios',
};

export const FIXED_ICONS: Partial<Record<keyof HomeStackParamList, IconName>> = {
  Home: 'home',
  Cards: 'card',
  Movements: 'swap-horizontal',
  Loans: 'cash',
  Services: 'settings',
};


export type HomeStackParamList = {
  Home: undefined;
  Cards: undefined;
  Movements: undefined;
  Loans: undefined;
  Services: undefined;
  ServiceDetail: { serviceId: string };
};


export const TAB_CONFIG: Record<
  keyof BottomTabParamList,
  {
    label: string;
    icon: IconName;
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

export type BottomTabParamList = {
  HomeTab: undefined;
  Chat: undefined;
  Settings: undefined;
};
