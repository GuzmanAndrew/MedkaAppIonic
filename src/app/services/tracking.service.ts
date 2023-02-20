import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { HTTP as NativeHttpClient } from '@ionic-native/http';

import { CommonDataRow, CommonRawForm, TrackingType } from '../models';
import { apiUrl } from '../models/config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  constructor(
    private auth: AuthService,
    private http: HttpClient,
  ) { }

  /**
   * Guardar nuevo valor
   */
  public async pushValue(type: TrackingType, form: CommonRawForm) {
    // Obtener user id
    const { id } = await this.auth.getUser();
    const requestPayload = { pacienteId: id, ...form };
    // Seleccionar funcion
    let endpoint = ''; // URL
    if (type === 'frecuenciaCardiaca') {
      endpoint = `${apiUrl}/api/frecuencia/save`;
    }
    if (type === 'presionArterial') {
      endpoint = `${apiUrl}/api/presion/save`;
    }
    if (type === 'temperaturaCorporal') {
      endpoint = `${apiUrl}/api/temp/save`;
    }
    if (type === 'oxigenoSangre') {
      endpoint = `${apiUrl}/api/oxi/save`;
    }
    if (Capacitor.isNativePlatform()) {
      // Native
      const token = this.auth.currentToken;
      const nativeInfoRequest = NativeHttpClient.post(endpoint, requestPayload, {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${token}`,
      });
    } else {
      // Browser
      return this.http.post<CommonDataRow>(endpoint, requestPayload).toPromise();
    }
  }

  /**
   * Obtener los valores de un tipo
   */
  public async fetchValues(type: TrackingType) {
    // Obtener user id
    const { id } = await this.auth.getUser();
    // Seleccionar funcion
    let endpoint = ''; // URL
    if (type === 'frecuenciaCardiaca') {
      endpoint = `${apiUrl}/api/frecuencia/user/${id}`;
    }
    if (type === 'presionArterial') {
      endpoint = `${apiUrl}/api/presion/user/${id}`;
    }
    if (type === 'temperaturaCorporal') {
      endpoint = `${apiUrl}/api/temp/user/${id}`;
    }
    if (type === 'oxigenoSangre') {
      endpoint = `${apiUrl}/api/oxi/user/${id}`;
    }
    if (Capacitor.isNativePlatform()) {
      // Native
      const token = this.auth.currentToken;
      const nativeInfoRequest = NativeHttpClient.get(endpoint, {}, {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${token}`,
      });
      const { data } = await nativeInfoRequest;
      return JSON.parse(data) as CommonDataRow[];
    } else {
      // Browser
      return this.http.get<CommonDataRow[]>(endpoint).toPromise();
    }
  }

}
