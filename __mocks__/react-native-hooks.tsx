import React from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export const setItem = jest.fn();
export const getItem = jest.fn();
export const removeItem = jest.fn();

export const theme = {
  colors: {
    primary: '#000',
    white: '#fff',
    success: 'green',
    danger: 'red',
    surface: '#fff',
    textMuted: '#999',
    border: '#ccc',
  },
  spacing: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
  typography: {
    title: {
      fontSize: 20,
      fontWeight: '700',
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
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
