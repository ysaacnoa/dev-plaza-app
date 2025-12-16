import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { theme, AlertModal, getConnectionInfo } from 'react-native-hooks';
import { Icon } from '@shared/components';
import { SERVICES_DATA } from '../constants/services.constants';

import type { RouteProp } from '@react-navigation/native';
import type { HomeStackParamList } from '@navigation/constants/navigation.constants';

type ServiceDetailRouteProp = RouteProp<HomeStackParamList, 'ServiceDetail'>;

export function ServiceDetailScreen() {
  const route = useRoute<ServiceDetailRouteProp>();
  const navigation = useNavigation();
  const { serviceId } = route.params;

  const service = SERVICES_DATA.flatMap(section => section.data).find(
    s => s.id === serviceId,
  )!;

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showNoInternetModal, setShowNoInternetModal] = useState(false);

  const handlePay = async () => {
    try {
      const connection = await getConnectionInfo();

      const noInternet =
        !connection.isConnected ||
        connection.type === 'none' ||
        connection.type === 'unknown';

      if (noInternet) {
        setShowNoInternetModal(true);
        return;
      }

      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error checking network status:', error);
      setShowNoInternetModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Icon name={service.icon} size={80} color={theme.colors.primary} />
        <Text style={styles.title}>{service.title}</Text>
        <Text style={styles.description}>
          Completa los datos necesarios para procesar tu solicitud.{'\n'}
          Una vez confirmado, recibirás la notificación correspondiente.
        </Text>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={handlePay}
            style={[styles.button, styles.payButton]}
          >
            <Text style={styles.buttonText}>Pagar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.button, styles.cancelButton]}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AlertModal
        isVisible={showSuccessModal}
        iconChild={
          <Icon
            name="checkmark-circle-outline"
            size={64}
            color={theme.colors.success || '#4CAF50'}
          />
        }
        title="¡Servicio pagado con éxito!"
        description="Tu transacción ha sido procesada correctamente. Pronto recibirás la confirmación por email y en tu historial de movimientos."
        buttonText="Aceptar"
        onClose={handleCloseModal}
      />

      <AlertModal
        isVisible={showNoInternetModal}
        iconChild={
          <Icon
            name="wifi-outline"
            size={64}
            color={theme.colors.danger}
          />
        }
        title="Sin conexión a internet"
        description="Usted no tiene acceso a internet. Trate de establecer una conexión para continuar con el pago."
        buttonText="Entendido"
        onClose={() => setShowNoInternetModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  content: {
    flex: 1,
    padding: theme.spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: theme.colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    width: '100%',
    padding: theme.spacing.xl,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  cancelButton: {
    backgroundColor: theme.colors.danger,
  },
  button: {
    width: '100%',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
  },
  buttonText: {
    textAlign: 'center',
    color: theme.colors.white,
  },
  payButton: {
    backgroundColor: theme.colors.success,
  },
});