import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, first } from 'rxjs/operators';

import { RestEndPoint } from '../../../core/rest-api/models/models';
import { RestApiService } from '../../../core/rest-api/service/rest-api.service';
import { BaseComponent } from '../../../core/utils/base-component';
import { UserList } from '../../../shared/models/user-list';

@Component({
  selector: 'userportal-desktop-login',
  templateUrl: './user-login.component.html',
  styleUrls: []
})
export class UserLoginComponent extends BaseComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = false;
  uiFields = [
    { formControlName: 'username', placeholder: 'Username', type: 'text', pattern: '', validation: {
      required: 'Username is required'
    } },
    { formControlName: 'password', placeholder: 'Password', type: 'password', pattern: '', validation: {
      required: 'Password is required'
    } }
  ];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: RestApiService
  ) {
    super();
  }

  init(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get form(): any { return this.loginForm.controls; }

  onSubmit(): void {
    console.log(this.loginForm);
    this.submitted = true;
    this.errorMessage = false;
    // check if form is valid
    if (this.loginForm.invalid) {
      return;
    }
    if (this.form.username.value !== 'azad.pal@sc.com' || this.form.password.value !== 'abc123') {
      try {
        throw new Error('Invalid Username/ Password');
      } catch (err) {
        this.errorMessage = true;
      }
      return;
    }
    this.service.showProgressSubject.next(true);
    this.subscriptions.push(this.service.getApiData<UserList>(RestEndPoint.login, {
      email: this.form.username.value,
      password: this.form.password.value
    })
      .pipe(first(), filter((data) => !!data))
      .subscribe(
        () => {
          this.router.navigate(['/postlogin/userlist']);
          this.loading = false;
        },
        this.errorHandling));
  }

  /**
   * to handle the error
   */
  errorHandling() {
    this.errorMessage = true;
    this.loading = false;
  }
}
