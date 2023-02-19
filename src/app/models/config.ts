import { DataSetStyle } from '.';

/**
 * Diccionario de posibles configuraciones, segun tipo de medicion
 */
export const pageConfig = {
  frecuenciaCardiaca: {
    title: 'Frecuencia Cardíaca',
    keys: ['frecuencia'],
  },
  presionArterial: {
    title: 'Presión Arterial',
    keys: ['sistolica', 'diastolica'],
  },
  temperaturaCorporal: {
    title: 'Temperatura Corporal',
    keys: ['temperatura'],
  },
  oxigenoSangre: {
    title: 'Oxígeno en sangre',
    keys: ['oxigeno'],
  },
};

/**
 * Diccionario de configuraciones, segun el tipo de medicion
 */
export const graphConfig = {
  // Frecuencia cardiaca
  frecuencia: {
    borderColor: '#eb445a',
  } as DataSetStyle,
  // Oxigeno en sangre
  oxigeno: {
    borderColor: '#eb445a',
  } as DataSetStyle,
  // Presión Arterial
  sistolica: {
    borderColor: '#2dd36f',
  } as DataSetStyle,
  diastolica: {
    borderColor: '#e44d25',
  } as DataSetStyle,
  // Temperatira
  temperatura: {
    borderColor: '#15bee8',
  } as DataSetStyle,
};

// Ambiente Dev Heroku
export const apiUrl = 'http://backendbmedusuario-env.eba-v8mwyyrb.us-east-1.elasticbeanstalk.com';

// Ambiente Dev Local
// export const apiUrl = 'http://localhost:8082';

/**
 * URLs que no requieren autenticación
 */
export const skipAuthUrls = ['/auth/login', '/auth/nuevo', '/email/recovery'];
