import React, { createContext, useContext, useState, ReactNode } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { theme } from 'react-native-hooks';

interface LoadingContextType {
  loading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {children}

      {loading && (
        <View style={styles.loaderScreen}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}
    </LoadingContext.Provider>
  );
};

const styles = StyleSheet.create({
  loaderScreen: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
});

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context)
    throw new Error('useLoading must be used within LoadingProvider');
  return context;
};
