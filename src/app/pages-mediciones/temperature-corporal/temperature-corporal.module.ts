import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemperatureCorporalPageRoutingModule } from './temperature-corporal-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { TemperatureCorporalPage } from './temperature-corporal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemperatureCorporalPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TemperatureCorporalPage]
})
export class TemperatureCorporalPageModule {}
