import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormulaPageRoutingModule } from './formula-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { FormulaPage } from './formula.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormulaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FormulaPage]
})
export class FormulaPageModule {}
