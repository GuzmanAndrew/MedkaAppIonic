import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GlucometriaPage } from './glucometria.page';

const routes: Routes = [
  {
    path: '',
    component: GlucometriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlucometriaPageRoutingModule {}
