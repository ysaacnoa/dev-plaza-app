import { useAuth } from '@modules/auth/hooks/useAuth';
import { Icon, IconName } from '@shared/components';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from 'react-native-hooks';

export const SettingsScreen = () => {
  const phoneNumber = '+5198273219';
  const { logout, loading } = useAuth();

  const handleCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, cerrar',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ],
    );
  };

  const SettingItem = ({
    title,
    subtitle,
    iconName,
    testID,
  }: {
    title: string;
    subtitle: string;
    iconName: IconName;
    testID?: string;
  }) => (
    <View style={styles.itemContainer} testID={testID}>
      <Icon
        name={iconName}
        size={24}
        color={theme.colors.primary}
        style={styles.icon}
        testID={`${testID}-icon`}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} testID={`${testID}-title`}>
          {title}
        </Text>
        <Text style={styles.subtitle} testID={`${testID}-subtitle`}>
          {subtitle}
        </Text>
      </View>
      <Icon
        name="chevron-forward-outline"
        size={22}
        color="#C7C7CC"
        testID={`${testID}-chevron`}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} testID="settings-screen">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

      <View style={styles.listContainer}>
        <SettingItem
          title="Seguridad"
          subtitle="bloquea tu tarjeta y administra tu app"
          iconName="shield-checkmark-outline"
          testID="item-security"
        />
        <View style={styles.separator} testID="separator-1" />

        <SettingItem
          title="Configuración"
          subtitle="Compra por internet, efectivo, extranjero"
          iconName="card-outline"
          testID="item-configuration"
        />
        <View style={styles.separator} testID="separator-2" />

        <SettingItem
          title="Apple Pay"
          subtitle="Administra tus tarjetas afiliadas"
          iconName="logo-apple"
          testID="item-apple-pay"
        />
        <View style={styles.separator} testID="separator-3" />

        <SettingItem
          title="Personaliza tu APP"
          subtitle="Yapea por celular, ocultar saldos, productos principales"
          iconName="color-palette-outline"
          testID="item-personalize"
        />
      </View>

      <View style={styles.helpContainer}>
        <Text style={styles.helpText} testID="help-text">
          Si tienes alguna duda contactar al{' '}
          <Text
            style={styles.phoneText}
            onPress={handleCall}
            testID="phone-number"
          >
            {phoneNumber}
          </Text>
        </Text>
      </View>

      <View style={{ flex: 1 }} />

      <TouchableOpacity
        style={[styles.logoutButton, loading && styles.logoutButtonDisabled]}
        onPress={handleLogout}
        disabled={loading}
        testID="logout-button"
      >
        <Text style={styles.logoutText} testID="logout-text">
          {loading ? 'Cerrando sesión...' : 'Cerrar sesión'}
        </Text>
        <Icon
          name="log-out-outline"
          size={24}
          color={loading ? '#999' : '#FF3B30'}
          testID="logout-icon"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  listContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: theme.spacing.lg,
  },
  icon: {
    marginRight: theme.spacing.lg,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
    fontWeight: theme.typography.title.fontWeight,
  },
  subtitle: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs / 2,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.grayLight,
    marginLeft: 56, // alineado con el texto
  },
  helpContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
    backgroundColor: '#F2F2F7',
  },
  helpText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
  },
  phoneText: {
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: theme.typography.title.fontSize,
    color: '#FF3B30',
    marginRight: theme.spacing.sm,
    fontWeight: '600',
  },
  logoutButtonDisabled: {
    opacity: 0.6,
  },
});
