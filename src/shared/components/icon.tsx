import React from 'react';
import { ViewStyle } from 'react-native';
import { Ionicons, IoniconsIconName } from '@react-native-vector-icons/ionicons';
import { theme } from 'react-native-hooks';

export type IconName = IoniconsIconName;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

/**
 * Icon component - Wrapper for react-native-vector-icons/ionicons
 * Provides consistent icon usage across the app
 */
export function Icon({ name, size = 24, color = theme.colors.primary, style }: IconProps) {
  return (
    <Ionicons
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
}
