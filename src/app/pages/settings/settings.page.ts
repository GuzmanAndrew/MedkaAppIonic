import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ionViewWillEnter() {
    // Status bar
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: '#114058' });
    }
  }

  async logout() {
    await this.auth.logout();
    this.router.navigateByUrl('/landing', { skipLocationChange: true });
  }

}
