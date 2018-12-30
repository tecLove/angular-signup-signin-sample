import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RestApiService } from '../../../core/rest-api/service/rest-api.service';
import { BaseComponent } from '../../../core/utils/base-component';

@Component({
  selector: 'userportal-post-login-home',
  templateUrl: './post-login-home.component.html',
  styleUrls: ['./post-login-home.component.scss']
})
export class PostLoginHomeComponent extends BaseComponent {
  loading = false;

  constructor(
    private service: RestApiService,
    private router: Router
  ) {
    super();
  }

  init(): void {
    this.subscriptions.push(this.service.showProgressSubject.subscribe((data) => {
      data ? this.loading = true : this.loading = false;
    }));
    this.subscriptions.push(this.service.currentUserSubject.subscribe((user) => {
      if (!user) {
        this.router.navigate(['login']);
      }
    }));
    this.handleClick();
  }

  /**
   * to handle logout event
   */
  userLogout(): void {
    this.service.currentUserSubject.next(false);
    this.router.navigate(['login']);
  }

  /**
   * to handle routing to user list
   */
  handleClick() {
    this.service.showProgressSubject.next(true);
  }
}
