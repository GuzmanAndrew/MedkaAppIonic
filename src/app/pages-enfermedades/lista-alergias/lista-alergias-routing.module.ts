import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaAlergiasPage } from './lista-alergias.page';

const routes: Routes = [
  {
    path: '',
    component: ListaAlergiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaAlergiasPageRoutingModule {}
