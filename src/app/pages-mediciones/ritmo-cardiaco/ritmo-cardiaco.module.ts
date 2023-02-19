import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RitmoCardiacoPageRoutingModule } from './ritmo-cardiaco-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { RitmoCardiacoPage } from './ritmo-cardiaco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RitmoCardiacoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RitmoCardiacoPage]
})
export class RitmoCardiacoPageModule {}
