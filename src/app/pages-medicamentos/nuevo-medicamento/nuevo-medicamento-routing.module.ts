import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoMedicamentoPage } from './nuevo-medicamento.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoMedicamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoMedicamentoPageRoutingModule {}
