import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppHomeComponent } from './feature/app-home/component/app-home.component';
import { UserLoginComponent } from './feature/user-login/component/user-login.component';
import { UserRegistrationComponent } from './feature/user-registration/component/user-registration.component';

const route: Routes = [
  {
    path: 'login',
    component: AppHomeComponent,
    children: [
      {
        path: '',
        component: UserLoginComponent
      },
      {
        path: 'registration',
        component: UserRegistrationComponent
      }
    ]
  },
  {
    path: 'postlogin',
    loadChildren: 'src/app/feature/post-login-home/post-login-home.module#PostLoginHomeModule'
  },
  {
    path: 'maintenance',
    loadChildren: 'src/app/feature/app-maintenance/app-maintenance.module#AppMaintenanceModule'
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'maintenance', pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(route, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
