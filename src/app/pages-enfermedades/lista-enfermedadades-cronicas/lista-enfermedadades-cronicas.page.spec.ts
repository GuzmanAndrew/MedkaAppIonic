import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaEnfermedadadesCronicasPage } from './lista-enfermedadades-cronicas.page';

describe('ListaEnfermedadadesCronicasPage', () => {
  let component: ListaEnfermedadadesCronicasPage;
  let fixture: ComponentFixture<ListaEnfermedadadesCronicasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEnfermedadadesCronicasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaEnfermedadadesCronicasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
