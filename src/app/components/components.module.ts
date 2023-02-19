import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CenterLayoutComponent } from './center-layout/center-layout.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { TabsLayoutComponent } from './tabs-layout/tabs-layout.component';

@NgModule({
  declarations: [
    CenterLayoutComponent,
    CustomButtonComponent,
    CustomHeaderComponent,
    TabsLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
  ],
  exports: [
    CenterLayoutComponent,
    CustomButtonComponent,
    CustomHeaderComponent,
    TabsLayoutComponent,
  ]
})
export class ComponentsModule { }
