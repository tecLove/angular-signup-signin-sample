import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { FormErrorStateMatcher } from '../../../core/form-error-state-matcher.service';

@Component({
  selector: 'userportal-add-dialog',
  templateUrl: './adddialog.component.html',
  styleUrls: ['./adddialog.component.scss']
})
export class AddDialogComponent implements OnInit, AfterViewInit {
  @Input() inputData: Object;
  @Output() updateItem = new EventEmitter();
  @Output() addItem = new EventEmitter();
  @Input() loading: boolean;
  @Input() isErrorMessage: string;
  formIsValid = false;
  addDialog: FormGroup;
  firstnameValue = '';
  lastnameValue = '';
  matcher: ErrorStateMatcher;
  uiFields = [
    { formControlName: 'firstname', placeholder: 'First Name', type: 'text', pattern: '^[A-Z]+[a-zA-Z]*$', validation: {
      required: 'First Name is required',
      pattern: 'Please enter a valid First Name'
    } },
    { formControlName: 'lastname', placeholder: 'Last Name', type: 'text', pattern: '^[A-Z]+[a-zA-Z]*$', validation: {
      required: 'Last Name is required',
      pattern: 'Please enter a valid Last Name'
    } }
  ];

  constructor(
    private formBuilder: FormBuilder, private errorMatcher: FormErrorStateMatcher, private cdRef: ChangeDetectorRef
  ) {
    this.matcher = this.errorMatcher;
  }

  ngAfterViewInit () {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.defaultValue = this.inputData;
    this.addDialog = this.formBuilder.group({
      firstname: [this.firstnameValue, Validators.required],
      lastname: [this.lastnameValue, Validators.required]
    });
    this.addDialog.statusChanges.subscribe((status) => {
      this.formIsValid = status;
    });
  }
  set defaultValue(data: any) {
    if (data) {
      this.firstnameValue = data['first_name'];
      this.lastnameValue = data['last_name'];
    }
  }
  get form(): any { return this.addDialog.controls; }

  /**
   * to handle the submission of the form
   */
  onSubmit(): void {
    // check if form is valid
    if (this.addDialog.invalid) {
      return;
    }
    this.updateItem.emit({ id: this.inputData['id'], first_name: this.form.firstname.value,
      last_name: this.form.lastname.value, avatar: this.inputData['avatar'] });
  }
}
