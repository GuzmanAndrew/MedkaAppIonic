import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService, authServiceMock } from '../services/auth.service';
import { OnlyVisitorGuard } from './only-visitor.guard';

describe('OnlyVisitorGuard', () => {
  let guard: OnlyVisitorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
      ]
    });
    guard = TestBed.inject(OnlyVisitorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
