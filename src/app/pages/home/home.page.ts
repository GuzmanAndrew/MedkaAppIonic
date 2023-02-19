import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userName = '';

  links = [
    // {
    //   title: 'Frecuencia Cardiáca',
    //   icon: { name: 'heart', color: 'danger' },
    //   url: '/tracking/frecuenciaCardiaca',
    // },
    // {
    //   title: 'Presión Arterial',
    //   icon: { name: 'thermometer', color: 'success' },
    //   url: '/tracking/presionArterial',
    // },
    // {
    //   title: 'Oxígeno en sangre',
    //   icon: { name: 'water', color: 'danger' },
    //   url: '/tracking/oxigenoSangre',
    // },
    // {
    //   title: 'Corporal Temperatura',
    //   icon: { name: 'thermometer', color: 'danger' },
    //   url: '/tracking/temperaturaCorporal',
    // },
    {
      title: 'Mediciones',
      icon: { name: 'heart', color: 'danger' },
      img: 'assets/mockup/mediciones.png',
      url: '/mediciones',
    },
    {
      title: 'Medicamentos',
      icon: { name: 'heart', color: 'danger' },
      img: 'assets/mockup/capsules.png',
      url: '/medicamentos',
    },
    {
      title: 'Enfermedades',
      icon: { name: 'heart', color: 'danger' },
      img: 'assets/mockup/sick.png',
      url: '/enfermedades',
    },
    // {
    //   title: 'Sintomas',
    //   icon: { name: 'heart', color: 'danger' },
    //   img: 'assets/mockup/diagnostico.png',
    //   url: '/tracking/frecuenciaCardiaca',
    // },
  ];

  subscriptions = new Subscription();

  constructor(private auth: AuthService) {}

  ionViewWillEnter() {
    // Status bar
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: '#114058' });
    }
    // User name
    const userNameSubscription = this.auth.user.subscribe((user) => {
      if (!user) {
        throw new Error('No user!');
      }
      this.userName = user.nombres;
    });
    this.subscriptions.add(userNameSubscription);
  }

  ionViewWillLeave() {
    this.subscriptions.unsubscribe();
  }
}
