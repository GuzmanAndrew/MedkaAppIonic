import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Storage } from '@ionic/storage-angular';
import { HTTP as NativeHttpClient } from '@ionic-native/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoginForm, MessageResponse, RecoveryForm, RegisterForm, TokenPayload, TokenResponse, UserInfo } from '../models/forms';
import { apiUrl } from '../models/config';


export const authServiceMock = {
  authState: new Subject<TokenPayload>(),
  login: async (form: LoginForm) => null,
  register: async (form: RegisterForm) => null,
  logout: async () => null,
  loadFromStorage: async () => null,
};

const jwt = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Estado de autenticación, presentado como un subject al que se puede subscribir
   * Si es nulo, significa que aun no se ha terminado de cargar
   * Si es false, es porque no se encontró una sesión
   */
  public state = new BehaviorSubject<TokenPayload | boolean>(null);
  public user = new BehaviorSubject<UserInfo>(null);

  /* Token actual **/
  public currentToken = '';

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {
    // Cargar sesión desde localStorage
    this.storage.create().then();
    this.loadFromStorage().then();
    // Configurar Native client
    if (Capacitor.isNativePlatform()) {
      NativeHttpClient.setDataSerializer('json');
    }
  }

  /**
   * Iniciar sesión usando API
   */
  public async login(form: LoginForm) {
    let response: TokenResponse;
    if (Capacitor.isNativePlatform()) {
      // Native
      const nativeLoginRequest = NativeHttpClient.post(`${apiUrl}/auth/login`, form, {});
      const { data, status } = await nativeLoginRequest;
      response = JSON.parse(data) as TokenResponse;
    } else {
      // Browser
      const loginRequest = this.http.post<TokenResponse>(`${apiUrl}/auth/login`, form);
      response = await loginRequest.toPromise();
    }
    // Resolver datos del token
    const { token } = response;
    const decoded: TokenPayload = jwt.decodeToken(token);
    this.state.next(decoded);
    this.storage.set('USER_TOKEN', token).then();
    // Guardar token para realizar proximos requests
    this.currentToken = token;
    // Cargar info del usuario actual
    const { sub: usuario } = decoded;
    let userInfo: UserInfo;
    if (Capacitor.isNativePlatform()) {
      // Native
      const nativeInfoRequest = NativeHttpClient.get(`${apiUrl}/auth/usuario/${usuario}`, {}, {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${token}`,
        ...{}
      });
      const { data } = await nativeInfoRequest;
      userInfo = JSON.parse(data) as UserInfo;
    } else {
      // Browser
      const infoRequest = this.http.get<UserInfo>(`${apiUrl}/auth/usuario/${usuario}`);
      userInfo = await infoRequest.toPromise();
    }
    this.user.next(userInfo);
    this.storage.set('USER_INFO', userInfo).then();
    // Devolver info
    return userInfo;
  }

  public async register(form: RegisterForm): Promise<MessageResponse> {
    // Realizar request
    if (Capacitor.isNativePlatform()) {
      // Native
      const nativeRequest = NativeHttpClient.post(`${apiUrl}/auth/nuevo`, form, {});
      const { data, status } = await nativeRequest;
      return JSON.parse(data) as MessageResponse;
    } else {
      // Browser
      return this.http.post<MessageResponse>(`${apiUrl}/auth/nuevo`, form).toPromise();
    }
  }

  public recovery(form: RecoveryForm): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(`${apiUrl}/email/recovery/`, form);
  }

  /**
   * Obtener datos de usuario actual
   */
  public async getUser() {
    if (!this.state.value && typeof this.state !== 'boolean') {
      throw new Error('No ha iniciado sesión');
    }
    const { sub: user } = this.state.value as TokenPayload;
    // Realizar request
    if (Capacitor.isNativePlatform()) {
      // Native
      const token = this.currentToken;
      if (!token) {
        throw new Error('No ha iniciado sesión');
      }
      const nativeInfoRequest = NativeHttpClient.get(`${apiUrl}/auth/usuario/${user}`, {}, {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${token}`,
        ...{}
      });
      const { data } = await nativeInfoRequest;
      // Guardar información actualizada
      const userInfo = JSON.parse(data) as UserInfo;
      this.user.next(userInfo);
      this.storage.set('USER_INFO', userInfo).then();
      return userInfo;
    } else {
      // Browser
      return this.http.get<UserInfo>(`${apiUrl}/auth/usuario/${user}`).pipe(
        map(userInfo => {
          // Guardar información actualizada
          this.user.next(userInfo);
          this.storage.set('USER_INFO', userInfo).then();
          return userInfo;
        })
      ).toPromise();
    }
  }

  public updateUser(id: number, form: RegisterForm): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(`${apiUrl}/auth/update/${id}`, form);
  }

  /* public exportPdf(id: number): Observable<Blob> {
    return this.http.get(`${apiUrl}/email/export/pdf/${id}`, {responseType: 'blob'});
  } */

  public async logout() {
    await this.storage.remove('USER_TOKEN');
    await this.storage.remove('USER_INFO');
    this.currentToken = '';
    this.state.next(false);
    this.user.next(null);
  }

  public sendPasswordResetEmail(email: string) {
    throw new Error('Method sendPasswordResetEmail not implemented.');
  }

  public confirmPasswordReset(oobCode: string, password: string) {
    throw new Error('Method confirmPasswordReset not implemented.');
  }

  public applyActionCode(oobCode: string) {
    throw new Error('Method applyActionCode not implemented.');
  }

  public checkActionCode(oobCode: string) {
    throw new Error('Method checkActionCode not implemented.');
  }

  public async loadFromStorage() {
    const token = await this.storage.get('USER_TOKEN');
    const userInfo: UserInfo = await this.storage.get('USER_INFO');
    if (!token || !userInfo) {
      this.state.next(false);
      this.user.next(null);
      return null;
    }
    this.currentToken = token;
    const decoded: TokenPayload = jwt.decodeToken(token);
    // Comprobar si no ha expirado
    const currentUnix = new Date().getTime() / 1000; // Se divide ya que exp se proporciona en segundos y getTime() en milisegundos
    if (decoded.exp <= currentUnix) {
      // Expiró! cerrar sesión
      this.state.next(false);
      this.user.next(null);
      await this.storage.remove('USER_TOKEN');
      await this.storage.remove('USER_INFO');
      return null;
    }
    // Guardar valores
    this.state.next(decoded);
    this.user.next(userInfo);
  }
}
