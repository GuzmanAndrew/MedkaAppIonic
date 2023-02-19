import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresionArterialPage } from './presion-arterial.page';

const routes: Routes = [
  {
    path: '',
    component: PresionArterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PresionArterialPageRoutingModule {}
