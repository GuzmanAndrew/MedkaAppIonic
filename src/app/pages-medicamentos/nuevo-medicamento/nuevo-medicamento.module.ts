import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoMedicamentoPageRoutingModule } from './nuevo-medicamento-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { NuevoMedicamentoPage } from './nuevo-medicamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoMedicamentoPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [NuevoMedicamentoPage]
})
export class NuevoMedicamentoPageModule {}
