import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialDesignModule } from '../../shared/material-design/material-design.module';
import { ProgressLoaderModule } from '../../shared/progress-loader/progress-loader.module';
import { UserLoginModule } from '../user-login/user-login.module';
import { UserRegistrationModule } from '../user-registration/user-registration.module';

import { AppHomeComponent } from './component/app-home.component';

@NgModule({
  imports: [
    CommonModule,
    UserLoginModule,
    RouterModule,
    MaterialDesignModule,
    ProgressLoaderModule,
    UserRegistrationModule
  ],
  declarations: [AppHomeComponent]
})
export class AppHomeModule { }
