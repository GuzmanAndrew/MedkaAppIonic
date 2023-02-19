import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

import { AuthService } from 'src/app/services/auth.service';
import { RecoveryForm, RegisterForm } from 'src/app/models/forms';
import { extractErrorMessage } from 'src/app/models/functions';
import { errorToast } from 'src/app/utils/toast';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage {

  recoveryForm = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required, Validators.email
    ])),
    password: new FormControl('')
  });
  
  constructor(
    private auth: AuthService,
    private toast: ToastController,
    private router: Router,
  ) { }

  ionViewWillEnter() {
    // Status bar
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Light });
      StatusBar.setBackgroundColor({ color: '#ffffff' });
    }
    // Limpiar formulario
    this.recoveryForm.enable();
    this.recoveryForm.setValue({
      email: '',
      password: ''
    });
  }

  handleRecovery(): void {
    const form = this.recoveryForm.value as RecoveryForm;
    this.auth.recovery(form).subscribe(
      data => {
        this.toast.create({
          message: 'Información actualizada!',
          duration: 1500,
          color: 'success'
        }).then(t => t.present());
        this.router.navigateByUrl('/login');
      },
      err => {
        this.toast.create({
          message: 'Error',
          duration: 1500,
          color: 'danger'
        }).then(t => t.present());
      }
    )
  }
}
