import React from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export const setItem = jest.fn();
export const getItem = jest.fn();
export const removeItem = jest.fn();

export const theme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  colors: {
    primary: '#007AFF',
    secondary: '#5AC8FA',
    danger: '#FF3B30',
    warning: '#FF9500',
    success: '#34C759',
    surface: '#FFFFFF',
    text: '#000000',
    textSecondary: '#666666',
    border: '#E5E5EA',
    background: '#F2F2F7',
  },
  typography: {
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600',
    },
    body: {
      fontSize: 14,
      fontWeight: '400',
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
    },
  },
};

export const Button = React.forwardRef<any, any>((props: any, ref: any) => {
  const styles = StyleSheet.create({
    button: {
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    text: {
      color: '#fff',
      fontWeight: '600',
    },
  });

  return (
    <TouchableOpacity 
      ref={ref}
      style={styles.button} 
      onPress={props.onPress} 
      disabled={props.disabled}
      testID={props.testID}
    >
      <Text style={styles.text}>{props.label}</Text>
    </TouchableOpacity>
  );
});

Button.displayName = 'Button';

export const InputText = React.forwardRef<any, any>((props: any, ref: any) => {
  const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: 12,
      borderRadius: 8,
      fontSize: 14,
    },
  });

  return (
    <TextInput
      ref={ref}
      style={styles.input}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
      secureTextEntry={props.password}
      keyboardType={props.keyboardType}
      testID={props.testID}
    />
  );
});

InputText.displayName = 'InputText';
