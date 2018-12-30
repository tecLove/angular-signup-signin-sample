import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MaintenanceComponent } from './maintenance.component';

describe('MaintenanceComponent', () => {
  let component: MaintenanceComponent;
  let fixture: ComponentFixture<MaintenanceComponent>;
  const metaData = {
    bodyText: 'System is under maintenance'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function findSelector(selector: string) {
    return fixture.debugElement.query(By.css(selector)).nativeElement;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check for maintenance body text', () => {
    expect(findSelector('#maintenanceBody').textContent).toBe(metaData.bodyText);
  });
});
