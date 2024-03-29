import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { CenterLayoutComponent } from './center-layout.component';

describe('CenterLayoutComponent', () => {
  let component: CenterLayoutComponent;
  let fixture: ComponentFixture<CenterLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterLayoutComponent ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CenterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
