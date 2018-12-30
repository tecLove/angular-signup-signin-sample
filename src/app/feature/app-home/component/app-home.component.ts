import { Component } from '@angular/core';

import { RestApiService } from '../../../core/rest-api/service/rest-api.service';
import { BaseComponent } from '../../../core/utils/base-component';

@Component({
  selector: 'userportal-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss']
})
export class AppHomeComponent extends BaseComponent {
  loading = false;
  constructor(private service: RestApiService) {
    super();
  }

  init(): void {
    this.subscriptions.push(this.service.showProgressSubject.subscribe((data) => {
      data ? this.loading = true : this.loading = false;
    }));
  }
}
