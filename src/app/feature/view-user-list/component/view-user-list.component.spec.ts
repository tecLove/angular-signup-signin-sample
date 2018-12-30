import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs/index';

import { RestApiService } from '../../../core/rest-api/service/rest-api.service';
import { MaterialDesignModule } from '../../../shared/material-design/material-design.module';

import { ViewUserListComponent } from './view-user-list.component';

describe('ViewUserListComponent', () => {
  let component: ViewUserListComponent;
  let fixture: ComponentFixture<ViewUserListComponent>;
  const metaData = {
    bodyText: 'You can Filter, Sort, Edit and Delete the entries of the table below'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, MaterialDesignModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [ ViewUserListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function findSelector(selector: string) {
    return fixture.debugElement.query(By.css(selector)).nativeElement;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchUserList', fakeAsync(() => {
    spyOn(component, 'getInterval').and.callFake(() => of(true));
    component.fetchUserList();
    component.userData$.subscribe((data) =>
      expect(data).toEqual(true));
    tick();
  }));

  it('should call linkClicked method with delete with success', fakeAsync(() => {
    spyOn(TestBed.get(RestApiService), 'getApiData').and.returnValue(of({ id: '' }));
    component.linkClicked({ delete: true, update: false });
    component.userData$.subscribe((data) =>
    expect(data).toEqual({ id: '' }));
  }));

  it('should call linkClicked method with delete', fakeAsync(() => {
    spyOn(TestBed.get(RestApiService), 'getApiData').and.returnValue(of({ id: '', first_name: 'test' }));
    component.linkClicked({ delete: true, update: false });
    component.userData$.subscribe((data) =>
      expect(data).toEqual({ id: '', first_name: 'test' }));
  }));

  it('should call linkClicked method with delete with error', fakeAsync(() => {
    spyOn(TestBed.get(RestApiService), 'getApiData').and.callFake(() => {
      return throwError('there is an error');
    });
    component.linkClicked({ delete: false, update: true });
    component.userData$.subscribe((data) =>
      expect(data).toEqual(null));
  }));
  it('should check for maintenance body text', () => {
    component.userData$ = of(true);
    fixture.detectChanges();
    expect(findSelector('#userlistMssg').textContent).toBe(metaData.bodyText);
  });
});
