/**
 * Tipo de medicion
 */
export type TrackingType = 'frecuenciaCardiaca' | 'presionArterial' | 'temperaturaCorporal' | 'oxigenoSangre';

/**
 * Formulario básico de datos
 */
export interface CommonRawForm {
  // Frecuencia cardiaca
  frecuencia?: string | number;
  // Oxigeno en sangre
  oxigeno?: string | number;
  // Presión Arterial
  sistolica?: string | number;
  diastolica?: string | number;
  // Temperatira
  temperatura?: string | number;
}

/**
 * Fila de datos obtenida del servidor
 */
export interface CommonDataRow extends CommonRawForm {
  id?: number;
  fecha: string;
  hora: string;
}

/**
 * Fila de datos con fechas procesadas
 */
export interface CommonDataItem extends CommonDataRow {
  /** Tipo de medición */
  type: TrackingType;
  /** Objeto de fecha */
  date: Date;
  /** Valor a mostrar en las tablas */
  displayValue: string;
  /** Fecha a mostrar en encabezado */
  displayDate: string;
  /** Hora a mostrar en las tablas */
  displayHour: string;
  /** Entero de la fecha, que sirve para ordenar facilmente las fechas */
  groupDate: number;
}

/**
 * Filas de datos, agrupados por dias
 */
export interface CommonDataGroup {
  title: string;
  groupDate: number;
  items: CommonDataItem[];
}


/**
 * Valores serializados para graficar
 */
export interface DataSetItem extends DataSetStyle {
  label: string;
  data: number[];
}

/**
 * Configuración de Chart.js
 */
export interface DataSetStyle {
  backgroundColor?: string[] | string;
  borderColor?: string[] | string;
  borderWidth?: number;
}
