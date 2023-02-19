import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

import { AuthService } from 'src/app/services/auth.service';
import { errorToast } from 'src/app/utils/toast';
import { LoginForm } from 'src/app/models/forms';
import { extractErrorMessage } from 'src/app/models/functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  loginForm = new FormGroup({
    nombreUsuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastController,
  ) { }

  ionViewWillEnter() {
    // Status bar
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Light });
      StatusBar.setBackgroundColor({ color: '#ffffff' });
    }
    // Limpiar formulario
    this.loginForm.enable();
    this.loginForm.reset();
  }

  async handleLogin() {
    const form: LoginForm = this.loginForm.value;
    this.loginForm.disable(); // Desactivar formulario
    const wipToast = await this.toast.create({
      message: 'Iniciando sesión...',
    }); // Toast en progreso
    await wipToast.present();
    try {
      const { nombres } = await this.auth.login(form);
      // Correcto: Toast success
      await wipToast.dismiss();
      this.toast.create({
        message: `Bienvenido ${nombres}`,
        duration: 1500,
        color: 'success'
      }).then(t => t.present());
      // Navegar a Home page
      this.router.navigateByUrl('/home');
    } catch (err) {
      // Error: Toast error
      this.loginForm.enable();
      wipToast.dismiss();
      const errorMessage = extractErrorMessage(err);
      this.toast.create(errorToast(errorMessage)).then(t => t.present());
    }
    this.loginForm.enable(); // Reactivar formulario
  }

}
