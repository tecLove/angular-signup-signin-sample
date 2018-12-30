import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs/index';
import Spy = jasmine.Spy;

import { userlistMetadata } from '../../../feature/view-user-list/metadata/view-user-metadata';
import { MaterialDesignModule } from '../../material-design/material-design.module';

import { UserTableComponent } from './user-table.component';

fdescribe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;
  let eventSpy: Spy;
  const userData = [{
    id: 1,
    first_name: 'Julius',
    last_name: 'Cosasdfg',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg'
  }];
  const userMetadata = {
    pagination: {
      type: 'text',
      position: 0,
      itemsPerPageLabel: 'Items Per Page',
      firstPageLabel: 'First Page',
      nextPageLabel: 'Next Page',
      lastPageLabel: 'Last Page',
      previousPageLabel: 'Previous Page'
    },
    filter: {
      type: 'text',
      position: 0,
      placeholder: 'Search',
      noData: 'There is no result to your search',
      anotherDate: ''
    },
    avatar: {
      type: 'text',
      position: 1,
      caption: 'Avatar'
    },
    firstname: {
      type: 'text',
      position: 2,
      caption: 'First Name'
    },
    lastname: {
      type: 'text',
      position: 3,
      caption: 'Last Name'
    }

  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, MaterialDesignModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [ UserTableComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    component.data = new BehaviorSubject<any>(userData);
    component.metaData = userMetadata;
    eventSpy = spyOn(component.linkClicked, 'emit');
    fixture.detectChanges();
  });

  function findSelector(selector: string) {
    return fixture.debugElement.query(By.css(selector)).nativeElement;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteItem method', () => {
    const id = 1;
    component.deleteItem(id);
    expect(eventSpy).toHaveBeenCalledWith({ id: id, delete: true, update: false });
  });

  it('should call updateItem method', () => {
    const body = { id: 1 };
    component.updateItem( body);
    expect(eventSpy).toHaveBeenCalledWith({ body: body, id: body.id, delete: false, update: true });
  });

  it('should call compare method', () => {
    const obj = { num1: 1, num2: 4, isAsc: true };
    expect(component.compare( obj.num1, obj.num2, obj.isAsc)).toEqual(-1);
    expect(component.compare( obj.num2, obj.num1, !obj.isAsc)).toEqual(-1);
    expect(component.compare( obj.num2, obj.num1, obj.isAsc)).toEqual(1);
  });

  it('should call applyFilter method', () => {
    component.applyFilter('Hello ');
    expect(component.dataSource.filter).toEqual('hello');
  });

  it('should call sortData method', () => {
    component.sortData({ active: 'true', direction: '' });
    expect(component.dataSource.filter).toEqual('');
    component.sortData({ active: 'true', direction: 'asc' });
    expect(component.dataSource.filter).toEqual('');
  });
  it('should call sortDataSource method', () => {
    component.metaDataObject = {
      first_name: {
        type: 'text',
        position: 3,
        caption: 'First Name'
      },
      last_name: {
        type: 'text',
        position: 2,
        caption: 'Last Name'
      }
    };
    const data = [{
      id: 1,
      first_name: 'Julius',
      last_name: 'Cosasdfg'
    }, {
      id: 2,
      first_name: 'Julie',
      last_name: 'Cosasdfg'
    }];
    const resultdata = [
      {
        id: 2,
        first_name: 'Julie',
        last_name: 'Cosasdfg'
      },
      {
        id: 1,
        first_name: 'Julius',
        last_name: 'Cosasdfg'
      }];
    expect(component.sortDataSource(data, { active: 'first_name', direction: 'dsc' })).toEqual(data);
    expect(component.sortDataSource(data, { active: 'first_name', direction: 'asc' })).toEqual(resultdata);
  });
  it('should call processData method with actions true', () => {
    component.actions = true;
    component.processData(userlistMetadata);
    expect(component.displayedColumns).toEqual(['avatar', 'first_name', 'last_name', 'actions']);
  });
  it('should call processData method with actions false', () => {
    component.actions = false;
    component.processData(userlistMetadata);
    expect(component.displayedColumns).toEqual(['avatar', 'first_name', 'last_name']);
  });
  it('should check table filter placeholder', () => {
    const ele = findSelector('#tableFilter').getAttribute('placeholder');
    expect(ele).toEqual(userMetadata.filter.placeholder);
  });
  it('should check table columns headers', () => {
    component.displayedColumns = ['avatar', 'firstname', 'lastname', 'actions'];
    component.metaData = userMetadata;
    component.dataSource.data = [{ firstname: 'test' }];
    fixture.detectChanges();
    const ele = fixture.debugElement.query(By.css('#userTable')).children[0]
    // const ele = findSelector('#avatar').textContent;
    expect(ele).toEqual(userMetadata.filter.placeholder);
  });
});
