import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserTableModule } from '../../shared/user-table/user-table.module';

import { ViewUserListComponent } from './component/view-user-list.component';

@NgModule({
  declarations: [ViewUserListComponent],
  imports: [
    CommonModule,
    UserTableModule,
    RouterModule.forChild([{ path: '', component: ViewUserListComponent, pathMatch: 'full' }])
  ]
})
export class ViewUserListModule { }
