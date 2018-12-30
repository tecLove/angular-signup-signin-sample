import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { MaterialDesignModule } from '../../shared/material-design/material-design.module';
import { ProgressLoaderModule } from '../../shared/progress-loader/progress-loader.module';

import { PostLoginHomeComponent } from './component/post-login-home.component';
import { AuthGaurdService } from './service/auth-gaurd.service';

@NgModule({
  declarations: [PostLoginHomeComponent],
  providers: [AuthGaurdService],
  imports: [
    CommonModule,
    MatSidenavModule,
    MaterialDesignModule,
    ProgressLoaderModule,
    RouterModule.forChild([
      { path: '', component: PostLoginHomeComponent,
        canActivate: [AuthGaurdService],
        children: [{
          path: 'userlist', loadChildren : 'src/app/feature/view-user-list/view-user-list.module#ViewUserListModule' }]
      }])
  ]
})
export class PostLoginHomeModule { }
