import jsonServerInstance from '../api/jsonInstance';
import { getParallelRateAverage } from './exchangeService';

// Actualizar el umbral de alerta y el estado de activación del usuario
export const updateUserAlertSettings = async (userId: number, threshold: number, enabled: boolean) => {
  const response = await jsonServerInstance.patch(`/users/${userId}`, {
    alertThreshold: threshold,
    alertEnabled: enabled,
  });
  return response.data;
};

// Obtener las configuraciones de alerta del usuario
export const getUserAlertSettings = async (userId: number) => {
  const response = await jsonServerInstance.get(`/users/${userId}`);
  return {
    alertThreshold: response.data.alertThreshold,
    alertEnabled: response.data.alertEnabled,
  };
};

// Verificar si el tipo de cambio paralelo supera el umbral
export const checkAlert = async (userId: number, currency: string = 'USD') => {
  const { alertThreshold, alertEnabled } = await getUserAlertSettings(userId);

  if (!alertEnabled) {
    return {
      triggered: false,
      message: 'La alerta está desactivada.',
      threshold: alertThreshold,
      enabled: alertEnabled,
    };
  }

  const parallelRate = await getParallelRateAverage(currency);

  if (!parallelRate) {
    return {
      triggered: false,
      message: 'No hay datos de tipo de cambio paralelo.',
      threshold: alertThreshold,
      enabled: alertEnabled,
    };
  }

  const isTriggered = parallelRate.buy > alertThreshold || parallelRate.sell > alertThreshold;
  return {
    triggered: isTriggered,
    message: isTriggered
      ? `¡Alerta! El tipo de cambio paralelo para ${currency} (Compra: ${parallelRate.buy}, Venta: ${parallelRate.sell}) superó el umbral de ${alertThreshold}.`
      : `El tipo de cambio paralelo para ${currency} está por debajo del umbral de ${alertThreshold}.`,
    buy: parallelRate.buy,
    sell: parallelRate.sell,
    threshold: alertThreshold,
    enabled: alertEnabled,
  };
};

// Simular un cambio en el tipo de cambio paralelo para probar la alerta
export const simulateAlertCheck = async (userId: number, currency: string = 'USD') => {
  const { alertThreshold, alertEnabled } = await getUserAlertSettings(userId);

  if (!alertEnabled) {
    return {
      triggered: false,
      message: 'La alerta está desactivada.',
      threshold: alertThreshold,
      enabled: alertEnabled,
    };
  }

  // Valores ficticios para simular un cambio en el tipo de cambio
  const simulatedParallelRate = {
    currency,
    buy: 7.5, // Valor alto para asegurar que supere la mayoría de los umbrales
    sell: 7.6,
  };

  const isTriggered = simulatedParallelRate.buy > alertThreshold || simulatedParallelRate.sell > alertThreshold;
  return {
    triggered: isTriggered,
    message: isTriggered
      ? `¡Alerta simulada! El tipo de cambio paralelo para ${currency} (Compra: ${simulatedParallelRate.buy}, Venta: ${simulatedParallelRate.sell}) superó el umbral de ${alertThreshold}.`
      : `El tipo de cambio paralelo simulado para ${currency} está por debajo del umbral de ${alertThreshold}.`,
    buy: simulatedParallelRate.buy,
    sell: simulatedParallelRate.sell,
    threshold: alertThreshold,
    enabled: alertEnabled,
  };
};