import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.page.html',
  styleUrls: ['./medicamentos.page.scss'],
})
export class MedicamentosPage implements OnInit {
  links = [
    {
      title: 'Registrar Nuevo Medicamento',
      url: '/nuevo-medicamento',
    },
    {
      title: 'Formula Médica Actual',
      url: '/formula',
    },
    {
      title: 'Historial de Medicamentos',
      url: '/historial',
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
