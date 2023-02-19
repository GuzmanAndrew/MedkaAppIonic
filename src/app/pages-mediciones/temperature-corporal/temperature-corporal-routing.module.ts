import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemperatureCorporalPage } from './temperature-corporal.page';

const routes: Routes = [
  {
    path: '',
    component: TemperatureCorporalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemperatureCorporalPageRoutingModule {}
