import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
})
export class MedicionesPage implements OnInit {
  links = [
    {
      title: 'Ritmo Cardiaco',
      url: '/ritmo-cardiaco',
    },
    {
      title: 'Presión Arterial',
      url: '/presion-arterial',
    },
    {
      title: 'Oxigenación en Sangre',
      url: '/oxigenacion-sangre',
    },
    {
      title: 'Glucometría',
      url: '/glucometria',
    },
    {
      title: 'Temperatura Corporal',
      url: '/temperature-corporal',
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
