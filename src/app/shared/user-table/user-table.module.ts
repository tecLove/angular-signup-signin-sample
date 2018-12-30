import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdddialogModule } from '../add/adddialog.module';
import { MaterialDesignModule } from '../material-design/material-design.module';

import { UserTableComponent } from './component/user-table.component';

@NgModule({
  declarations: [UserTableComponent],
  imports: [
    CommonModule,
    MaterialDesignModule,
    AdddialogModule
  ],
  exports: [UserTableComponent]
})
export class UserTableModule { }
