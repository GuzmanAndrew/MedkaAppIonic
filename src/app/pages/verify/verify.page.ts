import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

import { errorToast } from 'src/app/utils/toast';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage {

  modeUI = 'verify';
  message = 'Verificación en progreso';

  changePasswordForm = new FormGroup({
    password: new FormControl('', Validators.required),
  });

  private oobCode = '';

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private toast: ToastController
  ) { }

  async ionViewWillEnter() {
    // Leer parametros de URL
    const params = this.route.snapshot.queryParams;
    if (!params.oobCode) {
      // Si no contiene oobCode
      this.toast.create(errorToast(`No hay código oobCode en URL`)).then(t => t.present());
      return setTimeout(() => this.returnToBase(), 1500);
    }
    // Determinar siguiente acción
    if (params.mode === 'verifyEmail') {
      return this.verifyEmail(params.oobCode);
    }
    if (params.mode === 'resetPassword') {
      return this.configureResetPassword(params.oobCode);
    }
    // Funciones sin implementar
    this.toast.create(errorToast(`Código '${params.mode}' desconocido`)).then(t => t.present());
    return setTimeout(() => this.returnToBase(), 1500);
  }

  async verifyEmail(oobCode: string) {
    try {
      // Verificar y aplicar código
      await this.auth.checkActionCode(oobCode);
      await this.auth.applyActionCode(oobCode);
      // Correcto: Toast success
      this.toast.create({
        message: 'Correo verificado!',
        duration: 1500,
        color: 'success'
      }).then(t => t.present());
    } catch (err) {
      this.toast.create(errorToast(err.message)).then(t => t.present());
    }
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async configureResetPassword(oobCode: string) {
    try {
      // Verificar código
      await this.auth.checkActionCode(oobCode);
      // Mostrar formulario de cambio de contraseña
      this.oobCode = oobCode;
      this.modeUI = 'resetPassword';
      this.message = 'Cambiar contraseña';
    } catch (err) {
      this.toast.create(errorToast(err.message)).then(t => t.present());
      return setTimeout(() => this.returnToBase(), 1500);
    }
  }

  async handlePasswordReset() {
    const { password }: { password: string } = this.changePasswordForm.value;
    this.changePasswordForm.disable(); // Desactivar formulario
    const wipToast = await this.toast.create({
      message: 'Cambiando contraseña...',
    });
    await wipToast.present();
    try {
      await this.auth.confirmPasswordReset(this.oobCode, password);
      // Correcto: Toast success
      await wipToast.dismiss();
      this.toast.create({
        message: 'Contraseña cambiada!',
        duration: 1500,
        color: 'success'
      }).then(t => t.present());
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } catch (err) {
      // Error: Toast error
      this.changePasswordForm.enable();
      console.error(err);
      wipToast.dismiss();
      this.toast.create(errorToast(err.message)).then(t => t.present());
    }
    this.changePasswordForm.enable(); // Reactivar formulario
  }

  private returnToBase() {
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

}
