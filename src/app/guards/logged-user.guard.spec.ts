import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService, authServiceMock } from '../services/auth.service';
import { LoggedUserGuard } from './logged-user.guard';

describe('LoggedUserGuard', () => {
  let guard: LoggedUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
      ]
    });
    guard = TestBed.inject(LoggedUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
