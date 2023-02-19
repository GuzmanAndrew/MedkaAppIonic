import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enfermedades',
  templateUrl: './enfermedades.page.html',
  styleUrls: ['./enfermedades.page.scss'],
})
export class EnfermedadesPage implements OnInit {
  links = [
    {
      title: 'Registro Enfermedad/Alergia',
      url: '/registro-enfermedad',
    },
    {
      title: 'Lista Enfermedades Crónicas',
      url: '/lista-enfermedadades-cronicas',
    },
    {
      title: 'Lista Enfermedades Agudas',
      url: '/lista-enfermedadades-agudas',
    },
    {
      title: 'Lista Alergias',
      url: '/lista-alergias',
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
