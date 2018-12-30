import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import Spy = jasmine.Spy;
import { of } from 'rxjs/index';

import { FormErrorStateMatcher } from '../../../core/form-error-state-matcher.service';
import { RestApiService } from '../../../core/rest-api/service/rest-api.service';
import { MaterialDesignModule } from '../../../shared/material-design/material-design.module';

import { UserRegistrationComponent } from './user-registration.component';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let serviceSpy: Spy;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const metaData = {
    regTitle: 'User Registration',
    firstName: 'First Name',
    lastName: 'Last Name',
    userName: 'Username',
    password: 'Password',
    cancelBtn: '< Cancel',
    submitBtn: 'Submit',
    registrationSuccess: 'Registration is successful!',
    registrationSuccessBtn: 'OK'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, MaterialDesignModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [ UserRegistrationComponent ],
      providers: [FormErrorStateMatcher, { provide: Router, useValue: routerSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    serviceSpy = spyOn(TestBed.get(RestApiService), 'getApiData');
    serviceSpy.and.returnValue(of(true));
    fixture.detectChanges();
  });

  // create reusable function
  function updateForm(firstname: string, lastname: string, username: string, password: string) {
    component.userRegistration.controls['firstname'].setValue(firstname);
    component.userRegistration.controls['lastname'].setValue(lastname);
    component.userRegistration.controls['username'].setValue(username);
    component.userRegistration.controls['password'].setValue(password);
    component.onSubmit();
  }

  function findSelector(selector: string) {
    return fixture.debugElement.query(By.css(selector)).nativeElement;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call cancel registration method', () => {
    component.cancelRegistration();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
  });
  it('should call form submit method with form being invalid', () => {
    component.onSubmit();
    expect(component.submitted).toBe(true);
  });
  it('should call form submit method with form being valid and service spy returning true', () => {
    serviceSpy.and.returnValue(of(true));
    updateForm('Firstname', 'Lastname', 'username@test.com', 'password');
    expect(component.registrationSuccess).toBe(true);
  });
  it('should call success method', () => {
    component.successCall(null);
    expect(component.registrationSuccess).toBe(false);
  });
  it('should check for page title', () => {
    expect(fixture.debugElement.query(By.css('#regTitle')).children[0].nativeElement.textContent).toBe(metaData.regTitle);
  });
  it('should check for first name placeholder text', () => {
    expect(findSelector('#firstname').getAttribute('placeholder')).toBe(metaData.firstName);
  });
  it('should check for last name placeholder text', () => {
    expect(fixture.debugElement.query(By.css('#lastname')).nativeElement.getAttribute('placeholder')).toBe(metaData.lastName);
  });
  it('should check for username placeholder text', () => {
    expect(findSelector('#username').getAttribute('placeholder')).toBe(metaData.userName);
  });
  it('should check for password placeholder text', () => {
    expect(findSelector('#password').getAttribute('placeholder')).toBe(metaData.password);
  });
  it('should check for cancel button text', () => {
    expect( findSelector('#regCancelBtn span').textContent).toBe(metaData.cancelBtn);
  });
  it('should check for submit button text', () => {
    expect(findSelector('#regSubmitBtn span').textContent).toBe(metaData.submitBtn);
  });
  it('should check user registration success message', () => {
    component.registrationSuccess = true;
    fixture.detectChanges();
    expect(findSelector('#regSuccessBody p').textContent).toBe(metaData.registrationSuccess);
  });
  it('should check user registration success button text', () => {
    component.registrationSuccess = true;
    fixture.detectChanges();
    expect(findSelector('#userRegSuccessBtn').textContent).toBe(metaData.registrationSuccessBtn);
  });
});
