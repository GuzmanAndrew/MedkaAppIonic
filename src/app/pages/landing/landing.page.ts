import { Component, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage {

  @ViewChild('slides') slides: IonSlides;
  slideButtons = { skip: true, next: true };

  slideOpts = {
    pager: true
  };

  constructor() { }

  ionViewWillEnter() {
    // Status bar
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Light });
      StatusBar.setBackgroundColor({ color: '#ffffff' });
    }
  }

  async slideChange() {
    const index = await this.slides.getActiveIndex();
    if (index === 2) {
      return this.slideButtons = { skip: false, next: false };
    }
    return this.slideButtons = { skip: true, next: true };
  }

  skip = () => this.slides.slideTo(2);

  next = () => this.slides.slideNext();

}
