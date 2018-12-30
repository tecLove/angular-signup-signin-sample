import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaintenanceComponent } from './component/maintenance.component';

@NgModule({
  declarations: [MaintenanceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MaintenanceComponent, pathMatch: 'full' }
    ])
  ]
})
export class AppMaintenanceModule { }
