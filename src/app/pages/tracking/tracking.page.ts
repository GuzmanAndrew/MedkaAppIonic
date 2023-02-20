import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

import { CommonDataGroup, CommonRawForm, TrackingType } from 'src/app/models';
import { pageConfig } from 'src/app/models/config';
import { serializeRows, groupByDay, extractDataSets } from 'src/app/models/functions';
import { TrackingService } from 'src/app/services/tracking.service';

import { AuthService } from 'src/app/services/auth.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage {

  /**
   * Determina si mostrar pantalla de carga
   */
  loading = true;
  title = 'Mediciones';
  page: TrackingType = 'frecuenciaCardiaca';
  keys = [''];
  pdfObj: any;
  arrFrecuenciaValor = [];
  arrFrecuenciaHora = [];
  arrFrecuenciaFecha = [];

  chartType: ChartType = 'line';

  labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  datasets: ChartDataSets[] = [
    {
      label: 'My First dataset',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ];

  options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  groupedData: CommonDataGroup[] = [];
  dataGroup: any[] = [];

  fcForm = new FormGroup({
    frecuencia: new FormControl('', Validators.compose([
      Validators.required
    ])),
  });

  paForm = new FormGroup({
    sistolica: new FormControl('', Validators.compose([
      Validators.required
    ])),
    diastolica: new FormControl('', Validators.compose([
      Validators.required
    ])),
  });

  tcForm = new FormGroup({
    temperatura: new FormControl('', Validators.compose([
      Validators.required
    ])),
  });

  o2Form = new FormGroup({
    oxigeno: new FormControl('', Validators.compose([
      Validators.required
    ])),
  });

  constructor(
    private route: ActivatedRoute,
    private tracking: TrackingService,
    private auth: AuthService,
    private platform: Platform,
  ) { }

  async ionViewWillEnter() {
    // Status bar
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: '#114058' });
    }
    this.route.params.subscribe(async (params: { page: TrackingType }) => {
      // Cada que la URL cambia o se ingresa a esta página
      const { page } = params;
      // Título y mapping keys
      const { title, keys } = pageConfig[page];
      this.title = title;
      this.page = page;
      this.keys = keys;
      await this.update();
    });
  }

  /**
   * Recargar vistas
   */
  async update() {
    // Cargar datos
    this.loading = true;
    const data = await this.tracking.fetchValues(this.page);
    const displayData = serializeRows(data, this.page);

    this.groupedData = groupByDay(displayData);

    // Chart.js
    /** Los labels serán las fechas */
    this.labels = displayData.map(i => i.displayDate);
    this.datasets = extractDataSets(displayData, this.keys);
    this.loading = false;
  }

  /**
   * El formulario actualmente visible es válido?
   */
  isCurrentFormValid = () => this.selectForm(this.page).valid;

  /** Bloquear formularios */
  lockForms() {
    this.fcForm.disable();
    this.paForm.disable();
    this.tcForm.disable();
    this.o2Form.disable();
  }

  /** Limpiar formularios */
  clearForms() {
    this.fcForm.reset();
    this.paForm.reset();
    this.tcForm.reset();
    this.o2Form.reset();
  }

  /** Desloquear formularios */
  unlockForms() {
    this.fcForm.enable();
    this.paForm.enable();
    this.tcForm.enable();
    this.o2Form.enable();
  }

  async save(page?: TrackingType) {
    const selectedPage = page || this.page;
    this.lockForms();
    const formValue: CommonRawForm = this.selectForm(selectedPage).value;
    await this.tracking.pushValue(selectedPage, formValue);
    this.clearForms();
    this.unlockForms();
    return await this.update();
  }

  /**
   * Seleccionar el formulario a partir del tipo de medicion
   */
  private selectForm(type: TrackingType) {
    if (this.page === 'frecuenciaCardiaca') {
      return this.fcForm;
    }
    if (this.page === 'presionArterial') {
      return this.paForm;
    }
    if (this.page === 'temperaturaCorporal') {
      return this.tcForm;
    }
    if (this.page === 'oxigenoSangre') {
      return this.o2Form;
    }
  }

  /* generatePdf() {
    if (this.page == 'frecuenciaCardiaca') {
      this.getPdfFrecuencia();
    } else if (this.page == 'presionArterial') {
      alert('presionArterial');
    }
  } */

  /* async getPdfFrecuencia() {
    const { id } = await this.auth.getUser();
    if (this.platform.is('capacitor')) {
      this.auth.exportPdf(id).subscribe(x => {
        const blob = new Blob([x], { type: 'application/pdf' });
        const nav = (window.navigator as any);
        if (window.navigator && nav.msSaveOrOpenBlob) {
          nav.msSaveOrOpenBlob(blob);
          return;
        }
        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'ref.pdf';
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
    }
  } */
}
