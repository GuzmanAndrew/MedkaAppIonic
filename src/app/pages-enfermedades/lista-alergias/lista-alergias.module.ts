import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaAlergiasPageRoutingModule } from './lista-alergias-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';


import { ListaAlergiasPage } from './lista-alergias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAlergiasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListaAlergiasPage]
})
export class ListaAlergiasPageModule {}
