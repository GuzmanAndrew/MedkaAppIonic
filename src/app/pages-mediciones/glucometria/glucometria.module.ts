import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GlucometriaPageRoutingModule } from './glucometria-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { GlucometriaPage } from './glucometria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GlucometriaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [GlucometriaPage]
})
export class GlucometriaPageModule {}
