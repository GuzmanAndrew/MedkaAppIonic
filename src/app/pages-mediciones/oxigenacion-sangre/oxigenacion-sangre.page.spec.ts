import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OxigenacionSangrePage } from './oxigenacion-sangre.page';

describe('OxigenacionSangrePage', () => {
  let component: OxigenacionSangrePage;
  let fixture: ComponentFixture<OxigenacionSangrePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OxigenacionSangrePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OxigenacionSangrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
