import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { ToastController } from '@ionic/angular';
import { RegisterForm, UserInfo } from 'src/app/models/forms';
import { extractErrorMessage } from 'src/app/models/functions';
import { AuthService } from 'src/app/services/auth.service';
import { errorToast } from 'src/app/utils/toast';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  profileForm = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([
      Validators.required, Validators.email
    ])),
    password: new FormControl(''),
    edad: new FormControl('', Validators.required),
    cedula: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.required),
  });

  /**
   * Valor anterior, necesario para detectar cambios
   */
  private initialValue: UserInfo;
  name: string;
  last_name: string;
  id_user: number;

  constructor(
    private auth: AuthService,
    private toast: ToastController,
    private activatedRoute: ActivatedRoute
  ) { }

  async ionViewWillEnter() {
    // Status bar
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: '#114058' });
    }
    try {
    // Cargar datos actuales
    const userInfo = await this.auth.getUser();
    this.initialValue = userInfo;
    this.name = this.initialValue.nombres;
    this.last_name = this.initialValue.apellidos;
    this.id_user = this.initialValue.cedula;

    // Destructurar y solo obtener propiedades necesarias
    const { nombres, apellidos, email, edad, cedula, direccion, celular } = userInfo;
    this.profileForm.enable();
    this.profileForm.setValue({ nombres, apellidos, email, edad, cedula, direccion, celular, password: '' });
    } catch (err) {
      // Error: Toast error
      const errorMessage = extractErrorMessage(err);
      this.toast.create(errorToast(errorMessage)).then(t => t.present());
    }
  }

  update(): void {
    const form = this.profileForm.value as RegisterForm;
    this.auth.updateUser(this.initialValue.id, form).subscribe(
      data => {
        this.toast.create({
          message: 'Información actualizada!',
          duration: 1500,
          color: 'success'
        }).then(t => t.present());
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
