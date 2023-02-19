import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaEnfermedadadesAgudasPage } from './lista-enfermedadades-agudas.page';

describe('ListaEnfermedadadesAgudasPage', () => {
  let component: ListaEnfermedadadesAgudasPage;
  let fixture: ComponentFixture<ListaEnfermedadadesAgudasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEnfermedadadesAgudasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaEnfermedadadesAgudasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
