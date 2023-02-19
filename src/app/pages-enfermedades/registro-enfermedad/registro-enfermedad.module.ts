import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroEnfermedadPageRoutingModule } from './registro-enfermedad-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { RegistroEnfermedadPage } from './registro-enfermedad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroEnfermedadPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RegistroEnfermedadPage]
})
export class RegistroEnfermedadPageModule {}
