import { ToastOptions } from '@ionic/core';

export const errorToast = (message?: string): ToastOptions => ({
  message: message || 'Error desconocido',
  duration: 1500,
  color: 'danger'
});
