import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/index';
import { first } from 'rxjs/internal/operators';

import { RestApiService } from '../../../core/rest-api/service/rest-api.service';

@Injectable()
export class AuthGaurdService implements CanActivate {

  constructor(private service: RestApiService) { }

  /**
   * to check whether route can be activated or not
   */
  canActivate(): Observable<boolean> | boolean {
    return this.service.verifyLogin().pipe(first());
  }
}
