import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs/index';

import { RestApiService } from '../../../core/rest-api/service/rest-api.service';
import { MaterialDesignModule } from '../../../shared/material-design/material-design.module';

import { UserLoginComponent } from './user-login.component';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let service: RestApiService;
  let spyOnService: any;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const loginFormMetadata = {
    loginTitle: 'Login',
    signupTitle: 'Sign Up',
    usernameControlName: 'Username',
    passwordControlName: 'Password',
    submitButtonText: 'Submit'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, MaterialDesignModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [ UserLoginComponent ],
      providers: [{ provide: Router, useValue: routerSpy } ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    service = TestBed.get(RestApiService);
    spyOnService = spyOn(service, 'getApiData');
    fixture.detectChanges();
  });

  function findSelector(selector: string) {
    return fixture.debugElement.query(By.css(selector)).nativeElement;
  }

  // create reusable function for a dry spec.
  function submitForm(username: string, password: string) {
    component.loginForm.controls['username'].setValue(username);
    component.loginForm.controls['password'].setValue(password);
    component.onSubmit();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit method with form being invalid', () => {
    component.onSubmit();
    expect(component.loginForm.invalid).toBe(true);
  });

  it('should call onSubmit method with form being valid but incorrect credentials', () => {
    submitForm('azad.pa@sc.com', 'abc123');
    expect(component.loginForm.invalid).toBe(false);
    expect(component.errorMessage).toBe(true);
    submitForm('azad.pal@sc.com', 'abc23');
    expect(component.errorMessage).toBe(true);
  });
  it('should call onSubmit method with form being valid with correct credentials', () => {
    spyOnService.and.returnValues(of(true));
    fixture.detectChanges();
    submitForm('azad.pal@sc.com', 'abc123');
    expect(component.loginForm.invalid).toBe(false);
    expect(component.errorMessage).toBe(false);
  });
  it('should call error handling method', () => {
    component.errorHandling();
    expect(component.errorMessage).toBe(true);
  });
  it('should check for login title', () => {
    expect(findSelector('#loginFormTitle span').textContent).toBe(loginFormMetadata.loginTitle);
  });
  it('should check for sign up title', () => {
    expect(findSelector('#loginFormTitle a').textContent).toBe(loginFormMetadata.signupTitle);
  });
  it('should check for username control name', () => {
    expect(findSelector('#username').getAttribute('placeholder')).toBe(loginFormMetadata.usernameControlName);
  });
  it('should check for password control name', () => {
    expect(findSelector('#password').getAttribute('placeholder')).toBe(loginFormMetadata.passwordControlName);
  });
  it('should check for submit button text', () => {
    expect(findSelector('#loginSubmitBtn span').textContent).toBe(loginFormMetadata.submitButtonText);
  });
});
