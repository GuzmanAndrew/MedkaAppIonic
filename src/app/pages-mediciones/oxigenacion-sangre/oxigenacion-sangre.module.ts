import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OxigenacionSangrePageRoutingModule } from './oxigenacion-sangre-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { OxigenacionSangrePage } from './oxigenacion-sangre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OxigenacionSangrePageRoutingModule,
    ComponentsModule
  ],
  declarations: [OxigenacionSangrePage]
})
export class OxigenacionSangrePageModule {}
