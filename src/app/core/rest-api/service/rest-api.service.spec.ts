import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../../environments/environment';
import { RestEndPoint } from '../models/models';

import { RestApiService } from './rest-api.service';

describe('RestApiService', () => {
  let service: RestApiService;
  let httpTestingController: HttpTestingController;
  const loginUrl = environment.remoteHost + RestEndPoint.login;
  const remoteHost = environment.remoteHost1;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(RestApiService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /**
   * function to test error response of http call
   * @param restEndPoint
   * @param body
   * @param urlType
   */
  function httpCallWithErrorResponse(restEndPoint: any, body: any, urlType: any) {
    const emsg = 'deliberate 404 error';
    const _data = body;
    const url = restEndPoint === RestEndPoint.login ? loginUrl : remoteHost + restEndPoint;
    const _restEndpoint = restEndPoint === RestEndPoint.login || restEndPoint === RestEndPoint.add ||
    restEndPoint === RestEndPoint.listusers ? restEndPoint : null;
    const _urlType = restEndPoint === RestEndPoint.login ? null : urlType;
    service.getApiData(_restEndpoint , _data, _urlType).
    subscribe(() => null, (error: HttpErrorResponse) => {
      expect(error.status).toEqual(404, 'status');
      expect(error.error).toEqual(emsg, 'message');
    });
    const req = httpTestingController.expectOne(url);

    // Respond with mock error
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  }

  function httpCallWithSuccessResponse(restEndPoint: any, body: any, response: any, callType: any) {
    const _data = response;
    const _url = restEndPoint === RestEndPoint.login ? loginUrl : remoteHost + restEndPoint;
    service.getApiData(restEndPoint, body).subscribe((data) => expect(data).toEqual(_data));
    const req = httpTestingController.expectOne(_url);
    expect(req.request.method).toEqual(callType);
    req.flush(_data);
    httpTestingController.verify();
  }
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call monitorProgressLoader method', () => {
    service.monitorProgressLoader(true);
    // expect(service.showProgressSubject).toBe(of(true));
  });

  it('should call getApidata method to make a POST request with end point - login', () => {
    httpCallWithSuccessResponse(RestEndPoint.login, { email: 'test@test.com', password: 'test' }, { token: 'test' }, 'POST');
  });

  it('should call getApidata method to make a POST request with end point - add', () => {
    httpCallWithSuccessResponse(RestEndPoint.add, { first_name: 'test', last_name: 'test', avatar: '' },
      { first_name: 'test', last_name: 'test', avatar: '' }, 'POST');
  });

  it('should call catchError call back method for http call - login', () => {
    httpCallWithErrorResponse(RestEndPoint.login,
      { email: 'test@test.com', password: 'test' }, { methodtype: 'post', url: RestEndPoint.login });
  });

  it('should call catchError call back method for http call - add', () => {
    const emsg = 'deliberate 404 error';
    service.getApiData(RestEndPoint.add, { email: 'test@test.com', password: 'test' }).
    subscribe(() => fail('failed due to 404 error'), (error: HttpErrorResponse) => {
      expect(error.status).toEqual(404, 'status');
      expect(error.error).toEqual(emsg, 'message');
    });
    const req = httpTestingController.expectOne(remoteHost + RestEndPoint.add);

    // Respond with mock error
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

  it('should call getApidata method to make a POST request with end point - update', () => {
    const _data = { first_name: 'test', last_name: 'test', avatar: '' };
    service.getApiData(null , _data, { methodtype: 'put', url: RestEndPoint.update + '1' }).
    subscribe((data) => expect(data).toEqual(_data));
    const req = httpTestingController.expectOne(remoteHost + RestEndPoint.update + '1');
    expect(req.request.method).toEqual('PUT');
    req.flush(_data);
    httpTestingController.verify();
  });

  it('should call catchError call back method for http call - update', () => {
    httpCallWithErrorResponse(RestEndPoint.update + '1',
      { first_name: 'test', last_name: 'test', avatar: '' }, { methodtype: 'put', url: RestEndPoint.update + '1' });
  });

  it('should call catchError call back method for http call - delete', () => {
    httpCallWithErrorResponse(RestEndPoint.delete + '1',
      {}, { methodtype: 'delete', url: RestEndPoint.delete + '1' });
  });

  it('should call getApidata method to make a POST request with end point - default', () => {
    const _data = { first_name: 'test', last_name: 'test', avatar: '' };
    service.getApiData(null , _data, { methodtype: 'default', url: RestEndPoint.listusers }).
    subscribe((data) => expect(data).toEqual(_data));
    const req = httpTestingController.expectOne(remoteHost + RestEndPoint.listusers);
    expect(req.request.method).toEqual('GET');
    req.flush(_data);
    httpTestingController.verify();
  });

  it('should call catchError call back method for http call - default', () => {
    httpCallWithErrorResponse(RestEndPoint.listusers,
      null, { methodtype: 'get', url: null });
  });

  it('should call verifyLogin to verify the user login', () => {
    service.verifyLogin().subscribe((data) => {
      expect(data).toBe(false);
    });
  });
});
