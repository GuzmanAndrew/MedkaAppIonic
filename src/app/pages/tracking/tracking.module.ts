import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ChartsModule } from 'ng2-charts';

import { TrackingPageRoutingModule } from './tracking-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { TrackingPage } from './tracking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChartsModule,
    TrackingPageRoutingModule,
    ComponentsModule,
    PipesModule,
  ],
  declarations: [
    TrackingPage,
  ]
})
export class TrackingPageModule {}
