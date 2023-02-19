import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

import { AuthService } from 'src/app/services/auth.service';
import { errorToast } from 'src/app/utils/toast';
import { RegisterForm } from 'src/app/models/forms';
import { extractErrorMessage } from 'src/app/models/functions';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  registerForm = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    nombreUsuario: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([
      Validators.required, Validators.email
    ])),
    password: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    cedula: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.required),
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
    this.registerForm.enable();
    this.registerForm.reset();
  }


  async handleRegister() {
    const form: RegisterForm = this.registerForm.value;
    this.registerForm.disable(); // Desactivar formulario
    const wipToast = await this.toast.create({
      message: 'Creando cuenta...',
    }); // Toast en progreso
    await wipToast.present();
    try {
      const response = await this.auth.register(form);
      // Correcto: Toast success
      await wipToast.dismiss();
      this.toast.create({
        message: response.mensaje,
        duration: 1500,
        color: 'success'
      }).then(t => t.present());
      // Navegar a Login
      this.router.navigateByUrl('/login');
    } catch (err) {
      // Error: Toast error
      this.registerForm.enable();
      console.error(err);
      wipToast.dismiss();
      const errorMessage = extractErrorMessage(err);
      this.toast.create(errorToast(errorMessage)).then(t => t.present());
    }
    this.registerForm.enable(); // Reactivar formulario
  }

}
