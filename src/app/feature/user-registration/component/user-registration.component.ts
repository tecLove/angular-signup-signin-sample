import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs/internal/operators';

import { FormErrorStateMatcher } from '../../../core/form-error-state-matcher.service';
import { RestEndPoint } from '../../../core/rest-api/models/models';
import { RestApiService } from '../../../core/rest-api/service/rest-api.service';
import { BaseComponent } from '../../../core/utils/base-component';
import { UserList } from '../../../shared/models/user-list';

@Component({
  selector: 'userportal-desktop-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: []
})
export class UserRegistrationComponent extends BaseComponent {
  @Input() inputData: Object;
  @Input() requestType: string;
  @Output() updateItem = new EventEmitter();
  @Output() addItem = new EventEmitter();
  userRegistration: FormGroup;
  loading = false;
  submitted = false;
  registrationSuccess = false;
  matcher: ErrorStateMatcher;
  uiFields = [
    { formControlName: 'firstname', placeholder: 'First Name', type: 'text', pattern: '^[A-Z]+[a-zA-Z]*$', validation: {
      required: 'First Name is required',
      pattern: 'Please enter a valid First Name'
    } },
    { formControlName: 'lastname', placeholder: 'Last Name', type: 'text', pattern: '^[A-Z]+[a-zA-Z]*$', validation: {
      required: 'Last Name is required',
      pattern: 'Please enter a valid Last Name'
    } },
    { formControlName: 'username', placeholder: 'Username', type: 'email', validation: {
      required: 'Username is required',
      email: 'Please enter a valid Username'
    } },
    { formControlName: 'password', placeholder: 'Password', type: 'password', pattern: '[a-zA-Z0-9]*', validation: {
      required: 'Password is required',
      pattern: 'Please enter a valid Password'
    } }
  ];

  constructor(
    private formBuilder: FormBuilder, private errorMatcher: FormErrorStateMatcher,
    private service: RestApiService, private router: Router
  ) {
    super();
    this.matcher = this.errorMatcher;
  }

  init(): void {
    this.userRegistration = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
  }

  get form(): any { return this.userRegistration.controls; }

  /**
   * user registration
   */
  registration(requestBody: any) {
    const restEndPoint = RestEndPoint.add;
    const reqBody = requestBody;
    const reqMethod = 'post';
    this.subscriptions.push(this.service.getApiData<UserList>(null , reqBody, { methodtype: reqMethod, url: restEndPoint }).
    pipe(take(1), filter((data) => !!data)).subscribe((data) =>
    this.successCall(data)));
  }

  /**
   * method to be called on observable success
   * @param data
   */
  successCall(data: any): void {
    if (data) {
      this.userRegistration.reset();
      this.registrationSuccess = true;
    }
  }
  /**
   * to handle the submission of the form
   */
  onSubmit(): void {
    this.submitted = true;
    // check if form is valid
    if (this.userRegistration.invalid) {
      return;
    }
    this.loading = true;
    this.registration({ first_name: this.form.firstname.value, last_name: this.form.lastname.value,
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg' });
  }

  /**
   * cancel user registration
   */
  cancelRegistration() {
    this.router.navigate(['login']);
  }
}
