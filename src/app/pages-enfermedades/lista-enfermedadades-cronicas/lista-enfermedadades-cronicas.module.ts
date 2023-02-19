import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaEnfermedadadesCronicasPageRoutingModule } from './lista-enfermedadades-cronicas-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { ListaEnfermedadadesCronicasPage } from './lista-enfermedadades-cronicas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaEnfermedadadesCronicasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListaEnfermedadadesCronicasPage]
})
export class ListaEnfermedadadesCronicasPageModule {}
