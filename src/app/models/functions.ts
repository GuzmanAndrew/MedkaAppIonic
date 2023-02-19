import { CommonDataGroup, CommonDataItem, CommonDataRow, DataSetItem, DataSetStyle, TrackingType } from '.';
import { graphConfig } from './config';

/**
 * Obtener string de fecha en un formato valido para el constructor de Date()
 */
const correctDateFormat = (dateStr: string) => {
  const fragments = dateStr.split('-');
  const year = fragments[2];
  const month = fragments[1];
  const day = fragments[0];
  return [year, month, day].join('-');
};

/**
 * Extraer mensaje de error
 */
export const extractErrorMessage = (err: any): string => {
  console.log('Error', err);
  if ('message' in err) {
    return err.message;
  }
  if ('error' in err) {
    // Extraer objeto error
    const { error } = err;
    // Si el error es un string, no un objeto, intentar parsearlo
    if (typeof error === 'string') {
      try {
        const errorObj = JSON.parse(error);
        return errorObj.message || errorObj.mensaje || errorObj.error;
      } catch (e) {
        // Nose pudo parsear, mostrar error as-it-is
        return error;
      }
    }
    // Devolver desde el objeto error
    return error.message || error.mensaje || error.error;
  }
  return 'Error desconocido';
};

/**
 * Procesar y obtener type, date y displayDates
 */
export const serializeRows = (items: CommonDataRow[], type: TrackingType): CommonDataItem[] => items.map((item) => {
  // Cargar fecha a partir de los dos valores
  const { fecha, hora } = item;
  const fechaCorrecta = correctDateFormat(fecha);
  const date = new Date(fechaCorrecta + ' ' + hora);
  // Fecha pero con hora 00:00, en formato unix, para facilitar ordenamiento
  const groupDate = new Date(fecha).getTime();
  // Valor a mostrar en tablas
  const displayValue = serializeValue(item, type);
  // String de fecha a mostrar
  const displayDate = date.toLocaleDateString(
    'es-CO', { month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit' }
  );
  // String de hora a mostrar
  const displayHour = date.toLocaleTimeString(
    'es-CO', { hour: 'numeric', minute: '2-digit' }
  );
  // Devolver resultado, pasando el item original
  // Finalmente el tipo y display date
  return { ...item, type, date, displayValue, displayDate, displayHour, groupDate };
});

/**
 * Obtener un string simplificado de los valores, para mostrar en la tabla
 */
export const serializeValue = (item: CommonDataRow, type: TrackingType) => {
  if (type === 'frecuenciaCardiaca') {
    const { frecuencia } = item;
    return `BMP: ${frecuencia}`;
  }
  if (type === 'presionArterial') {
    const { sistolica, diastolica } = item;
    return `Sis: ${sistolica} | Dia: ${diastolica}`;
  }
  if (type === 'temperaturaCorporal') {
    const { temperatura } = item;
    return `Temperatura: ${temperatura}`;
  }
  if (type === 'oxigenoSangre') {
    const { oxigeno } = item;
    return `Oxigeno: ${oxigeno}`;
  }
};

/**
 * Agrupar por dias
 */
export const groupByDay = (items: CommonDataItem[]) => {
  const all: CommonDataGroup[] = [];
  const groups = {};
  items.forEach(item => {
    const { groupDate } = item;
    const target = groups[groupDate];
    if (target) {
      // El grupo ya existe
      const targetIndex = target as number;
      const targetGroup = all[targetIndex];
      const newItemsArray = targetGroup.items.concat([item]);
      const newGroup = { ...targetGroup, items: newItemsArray };
      all[targetIndex] = newGroup;
    } else {
      // Este grupo no existe en 'all' ni 'groups'
      const displayDate = item.date.toLocaleDateString(
        'es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      ); // Fecha a mostrar en item divider
      const newGroup = {
        title: displayDate, groupDate, items: [item]
      };
      const indexOf = all.push(newGroup) - 1; // Restar 1, ya que .push devuelve el nuevo tamaño del array
      groups[groupDate] = indexOf;
    }
  });
  return all;
};

/**
 * Extraer y agrupar datasets para mostrar en la gráfica
 */
export const extractDataSets = (items: CommonDataItem[], keys: string[]): DataSetItem[] => keys.map(key => {
  // Por cada key hacer:
  const data: number[] = items.map(i => i[key]);
  // Configuración de estilo
  const style = graphConfig[key];
  // Devolver un dataSet, con datos y configuración
  return { ...style, label: key, data };
});
