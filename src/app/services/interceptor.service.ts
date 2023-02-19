import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { skipAuthUrls } from '../models/config';
import { TokenPayload } from '../models/forms';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router,) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /**
     * Revisar si la url se encuentra en array de skipAuthUrls
     *
     * Normalmente request.url tiene un valor como http://api.com/auth/login
     * Se compara si request.url contiene una ruta que no requiere auth (ej. 'auth/login')
     */
    if (skipAuthUrls.some(url => request.url.includes(url))) {
      /** Si la url no requiere autenticación, simplemente continuar */
      return next.handle(request);
    }
    // Comprobar si no ha expirado
    const currentState = this.auth.state.value as TokenPayload;
    if (!currentState) {
      throw new Error('No ha iniciado sesión');
    }
    const currentUnix = new Date().getTime() / 1000; // Se divide ya que exp se proporciona en segundos y getTime() en milisegundos
    if (currentState.exp <= currentUnix) {
      // Expiró! cerrar sesión
      this.auth.logout().then(() => {
        this.router.navigateByUrl('/landing', { skipLocationChange: true });
      });
      throw new Error('Su sesión ha expirado');
    }
    /** Obtener token de AuthService */
    const token = this.auth.currentToken;
    if (!token) {
      throw new Error('No ha iniciado sesión');
    }
    /** Clonar request, ahora con auth header */
    const authorizedRequest = request.clone({
      setHeaders: { authorization: `Bearer ${token}` }
    });
    return next.handle(authorizedRequest);
  }
}
