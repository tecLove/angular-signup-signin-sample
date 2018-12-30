import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/index';

import { RestApiService } from '../../../core/rest-api/service/rest-api.service';

import { AuthGaurdService } from './auth-gaurd.service';
let service: AuthGaurdService;
describe('AuthGaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [ AuthGaurdService, {
      provide: RestApiService,
      useValue: {
        verifyLogin: () => of(true)
      }
    }]
  }));

  it('should be created', () => {
    service = TestBed.get(AuthGaurdService);
    expect(service).toBeTruthy();
  });

  it('should call canActivate method', () => {
    service = TestBed.get(AuthGaurdService);
    expect(service.canActivate()).toBeTruthy();
  });
});
