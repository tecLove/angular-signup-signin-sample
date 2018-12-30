import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs/index';

import { RestApiService } from '../../../core/rest-api/service/rest-api.service';

import { PostLoginHomeComponent } from './post-login-home.component';
import {By} from "@angular/platform-browser";

let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

describe('PostLoginHomeComponent', () => {
  let component: PostLoginHomeComponent;
  let fixture: ComponentFixture<PostLoginHomeComponent>;
  const metaData = {
    homebtn: 'Home',
    userlistBtn: 'Userlist',
    logoutBtn: 'Logout',
    welcomeMssg: 'Welcome to User Portal'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ PostLoginHomeComponent ],
      providers: [
        {provide: RestApiService, useValue: {
          getApiData: () => of(true),
          showProgressSubject: new BehaviorSubject<boolean>(false),
          currentUserSubject: new BehaviorSubject<boolean>(true)
        } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLoginHomeComponent);
    component = fixture.componentInstance;
    routerSpy = spyOn(TestBed.get(Router), 'navigate');
    fixture.detectChanges();
  });

  function findSelector(selector: string) {
    return fixture.debugElement.query(By.css(selector)).nativeElement;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call userLogout method', () => {
    component.userLogout();
    expect(routerSpy).toHaveBeenCalledWith(['login']);
  });
  it('should check for Home link text', () => {
    expect(findSelector('#homeBtn').textContent).toBe(metaData.homebtn);
  });
  it('should check for Userlist link text', () => {
    expect(findSelector('#userlistBtn').textContent).toBe(metaData.userlistBtn);
  });
  it('should check for Logout link text', () => {
    expect(findSelector('#logoutBtn').textContent).toBe(metaData.logoutBtn);
  });
  it('should check for Logout link text', () => {
    expect(findSelector('#welcomeMssg h3').textContent).toBe(metaData.welcomeMssg);
  });
});
