import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdddialogModule } from '../../shared/add/adddialog.module';
import { MaterialDesignModule } from '../../shared/material-design/material-design.module';

import { UserRegistrationComponent } from './component/user-registration.component';

@NgModule({
  declarations: [UserRegistrationComponent],
  imports: [
    CommonModule,
    AdddialogModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserRegistrationModule { }
