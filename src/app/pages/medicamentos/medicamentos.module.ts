import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicamentosPageRoutingModule } from './medicamentos-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { MedicamentosPage } from './medicamentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicamentosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MedicamentosPage]
})
export class MedicamentosPageModule {}
