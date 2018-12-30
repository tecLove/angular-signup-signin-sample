import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs/index';
import { catchError, filter, first, map, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { RestEndPoint, UrlType } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  currentUserSubject: BehaviorSubject<boolean>;
  showProgressSubject: BehaviorSubject<boolean>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<boolean>(false) ;
    this.showProgressSubject = new BehaviorSubject<boolean>(false);
  }

  /**
   * to monitor the progress loader
   * @param {boolean} value
   */
  monitorProgressLoader(value: boolean) {
    this.showProgressSubject.next(value);
  }

  /**
   * to make http call
   * @param {RestEndPoint} restendpoint
   * @param body
   * @param {UrlType} urlType
   * @returns {Observable<K>}
   */
  getApiData<K>(restendpoint: RestEndPoint, body?: any, urlType?: UrlType): Observable<K> {
    const method = urlType ? urlType.methodtype : 'post';
    const remoteHost = restendpoint === RestEndPoint.login ? 'remoteHost' : 'remoteHost1';
    const url = urlType ? urlType.url ? (environment[remoteHost] + urlType.url) :
      ( environment[remoteHost] ) + restendpoint : ( environment[remoteHost] + restendpoint );
    this.monitorProgressLoader(true);
    switch (method) {
      case 'post': {
        const reqBody = restendpoint === RestEndPoint.login ? {
          'email': body.email,
          'password': body.password
        } : {
          'first_name': body.first_name,
          'last_name': body.last_name,
          'avatar': body.avatar
        };
        return this.httpClient.post<K>(url, reqBody).pipe(
          catchError((e) => {
            if (restendpoint === RestEndPoint.login) {
              this.userData = null;
            }
            console.log('error occurred', e);
            return of(null);
          }), filter((data) => !!data), tap(() => {this.monitorProgressLoader(false); }), map((data) => {
            restendpoint === RestEndPoint.login ? this.userData = data : this.userData = null;
            return data;
          }));
      }
      case 'put': {
        return this.httpClient.put<K>(url, body).pipe(catchError((e) => {
          console.log(e);
          return of(null);
        }), tap((data) => {
          this.monitorProgressLoader(false);
          return data; }));
      }
      case 'delete': {
        return this.httpClient.delete<K>(url, body).pipe(catchError((e) => {
          console.log(e);
          return of(null);
        }), tap((data) => {
          this.monitorProgressLoader(false);
          return data; }));
      }
      default: {
        return this.httpClient.get<K>(url).pipe(catchError((e) => {
          console.log(e);
          return of(null);
        }), tap((data) => {
          this.monitorProgressLoader(false);
          return data; }));
      }
    }

  }

  /**
   * to set data to local storage
   * @param data
   */
  set userData(data: any) {
    if (data && data.token) {
      this.currentUserSubject.next(true);
    } else {
      this.currentUserSubject.next(false);
    }
  }

  /**
   * to return Observable of true in case login is successful
   */
  verifyLogin(): Observable<boolean> {
    return this.currentUserSubject.pipe(first());
  }
}
