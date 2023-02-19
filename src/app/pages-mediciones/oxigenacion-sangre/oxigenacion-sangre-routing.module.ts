import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OxigenacionSangrePage } from './oxigenacion-sangre.page';

const routes: Routes = [
  {
    path: '',
    component: OxigenacionSangrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OxigenacionSangrePageRoutingModule {}
