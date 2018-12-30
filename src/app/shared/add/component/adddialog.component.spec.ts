import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormErrorStateMatcher } from '../../../core/form-error-state-matcher.service';
import { MaterialDesignModule } from '../../material-design/material-design.module';

import { AddDialogComponent } from './adddialog.component';
import {By} from "@angular/platform-browser";

describe('AddDialogComponent', () => {
  let component: AddDialogComponent;
  let fixture: ComponentFixture<AddDialogComponent>;
  const metaData = {
    firstname: 'First Name',
    lastname: 'Last Name',
    submitBtn: 'Submit'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, MaterialDesignModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [ AddDialogComponent ],
      providers: [FormErrorStateMatcher]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // create reusable function
  function updateForm(firstname: string, lastname: string) {
    component.addDialog.controls['firstname'].setValue(firstname);
    component.addDialog.controls['lastname'].setValue(lastname);
    component.onSubmit();
  }

  function findSelector(selector: string) {
    return fixture.debugElement.query(By.css(selector)).nativeElement;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call form submit method with form being invalid', () => {
    component.onSubmit();
    expect(component.addDialog.invalid).toBe(true);
  });
  it('should call form submit method with form being valid', () => {
    component.inputData = { id: 1, first_name: 'firstname', last_name: 'lastname', avatar: 'avatar' };
    // component.defaultValue = { id: 1, first_name: 'firstname', last_name: 'lastname', avatar: 'avatar' };
    updateForm('Firstname', 'Lastname');
    expect(component.loading).toBe(undefined);
  });
  it('should call method to set default values to form field', () => {
    const data = { id: 1, first_name: 'firstname', last_name: 'lastname', avatar: 'avatar' };
    component.defaultValue = data;
    expect(component.firstnameValue).toEqual(data.first_name);
  });
  it('should check first name text', () => {
    expect(findSelector('#firstname').getAttribute('placeholder')).toBe(metaData.firstname);
  });
  it('should check last name text', () => {
    expect(findSelector('#lastname').getAttribute('placeholder')).toBe(metaData.lastname);
  });
  it('should check last name text', () => {
    expect(findSelector('#addDialogSubmitBtn').textContent).toBe(metaData.submitBtn);
  });
});
