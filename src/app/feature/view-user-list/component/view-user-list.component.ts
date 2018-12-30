import { Component } from '@angular/core';
import { interval } from 'rxjs/index';
import { of } from 'rxjs/index';
import { catchError } from 'rxjs/internal/operators';
import { switchMap, take, takeLast } from 'rxjs/operators';

import { RestEndPoint, UrlType } from '../../../core/rest-api/models/models';
import { RestApiService } from '../../../core/rest-api/service/rest-api.service';
import { BaseComponent } from '../../../core/utils/base-component';
import { UserList } from '../../../shared/models/user-list';
import { userlistMetadata } from '../metadata/view-user-metadata';

@Component({
  selector: 'userportal-view-user-list',
  templateUrl: './view-user-list.component.html'
})
export class ViewUserListComponent extends BaseComponent {
  userlistMetadata = userlistMetadata;
  userData$: any;
  isErrorMessage = null;
  loading = false;

  constructor(private service: RestApiService) {super(); }

  init(): void {
    this.fetchUserList();
  }
  /**
   * get user list from server
   */
  fetchUserList(): void {
    const url: UrlType = { methodtype: 'get', url: null };
    this.userData$ = this.getInterval().pipe(take(1), switchMap(() => {
      this.service.showProgressSubject.next(false);
      return this.userData$ = this.service.getApiData<UserList>(RestEndPoint.listusers, null , url);
    }));
  }

  /**
   * to return the interval observable
   * @returns {Observable<number>}
   */
  getInterval() {
    return interval(5000);
  }

  /**
   * to delete an item from users list
   * @param event
   */
  linkClicked(event: any) {
    this.isErrorMessage = null;
    this.loading = true;
    const restEndPoint = (event.delete ? RestEndPoint.delete : RestEndPoint.update) + event.id;
    const reqBody = event.delete ? {} : event.body;
    const reqMethod = event.delete ? 'delete' : 'put';
    this.userData$ = this.service.getApiData<UserList>(null , reqBody, { methodtype: reqMethod, url: restEndPoint }).
    pipe(catchError((error) => {
      console.log(error);
      this.loading = false;
      this.isErrorMessage = 'An error occurred while requesting the specified Url';
      return of(null);
    }), takeLast(1), switchMap(() => {
      return this.service.getApiData<UserList>(RestEndPoint.listusers, null, { methodtype: 'get', url: null }).pipe(catchError((error) => {
        this.loading = false;
        this.isErrorMessage = 'An error occurred while requesting the specified Url';
        return of(null);
      }));
    }));
  }
}
