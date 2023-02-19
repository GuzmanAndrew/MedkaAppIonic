import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroEnfermedadPage } from './registro-enfermedad.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroEnfermedadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroEnfermedadPageRoutingModule {}
