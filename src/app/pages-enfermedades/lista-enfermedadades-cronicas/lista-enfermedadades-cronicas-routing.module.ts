import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaEnfermedadadesCronicasPage } from './lista-enfermedadades-cronicas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaEnfermedadadesCronicasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaEnfermedadadesCronicasPageRoutingModule {}
