/**
 * Formulario de inicio de sesión
 */
export interface LoginForm {
  nombreUsuario: string;
  password: string;
}


/**
 * Formulario de registro de usuario
 */
export interface RegisterForm {
  email: string;
  password: string;
  nombreUsuario: string;
  edad: number;
  direccion: string;
  celular: number;
}

export interface RecoveryForm {
  password: string;
  email: string;
}

/**
 * Respuesta en forma de JSON con mensaje
 */
export interface MessageResponse {
  mensaje: string;
}

export interface TokenResponse {
  token: string;
  nombreUsuario: string;
  authorities: {
    authority: string;
  }[];
}

export interface TokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

export interface UserInfo {
  id: number;
  email: string;
  nombres: string;
  apellidos: string;
  nombreUsuario: string;
  edad: number;
  cedula: number;
  direccion: string;
  celular: number;
  roles: {
    id: number;
    rolNombre: string;
  }[];
}
