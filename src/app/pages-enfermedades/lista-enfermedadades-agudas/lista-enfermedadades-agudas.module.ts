import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaEnfermedadadesAgudasPageRoutingModule } from './lista-enfermedadades-agudas-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { ListaEnfermedadadesAgudasPage } from './lista-enfermedadades-agudas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaEnfermedadadesAgudasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListaEnfermedadadesAgudasPage]
})
export class ListaEnfermedadadesAgudasPageModule {}
