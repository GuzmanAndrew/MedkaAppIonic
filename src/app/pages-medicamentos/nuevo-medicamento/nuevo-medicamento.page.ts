import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-nuevo-medicamento',
  templateUrl: './nuevo-medicamento.page.html',
  styleUrls: ['./nuevo-medicamento.page.scss'],
})
export class NuevoMedicamentoPage implements OnInit {
  form: FormGroup;
  propsPresentacion = [
    {
      title: 'Pildora',
    },
    {
      title: 'Inyección',
    },
    {
      title: 'Gotas',
    },
    {
      title: 'Crema',
    },
    {
      title: 'Jarabe',
    },
    {
      title: 'Inhalador',
    },
  ];

  propsAdministracion = [
    {
      title: 'Vía Oral',
    },
    {
      title: 'Vía Intravenosa (IV)',
    },
    {
      title: 'Vía Intramuscular (IM)',
    },
    {
      title: 'Vía Intratecal',
    },
    {
      title: 'Vía Subcutánea (SC)',
    },
    {
      title: 'Vía Sublingual',
    },
    {
      title: 'Vía Bucal',
    },
    {
      title: 'Vía Vaginal',
    },
    {
      title: 'Vía Ocular',
    },
    {
      title: 'Vía Ótica',
    },
    {
      title: 'Vía Nasal',
    },
    {
      title: 'Por Inhalación',
    },
    {
      title: 'Por Nebulización',
    },
    {
      title: 'Tópico',
    },
    {
      title: 'Uso Cutáneo',
    },
    {
      title: 'Sistémico',
    },
    {
      title: 'Transdérmico',
    },
  ];

  constructor(
    public http: HttpClient,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      nombreMedicamento: ['', [Validators.required]],
      laboratorio: [''],
      presentacion: [''],
      Administracion: [''],
      frecuencia: [''],
      cantidadEncadaToma: [''],
      primeraDosis: [''],
      recordatorio: [false]
    });
  }

  get f() {
    return this.form.controls;
  }

  get() {
    console.log(this.f);
  }

  GuardarMedicamento(){
    console.log('w');
  }

}
