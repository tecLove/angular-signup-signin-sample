import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialDesignModule } from '../material-design/material-design.module';

import { AddDialogComponent } from './component/adddialog.component';

@NgModule({
  declarations: [AddDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialDesignModule
  ],
  exports: [AddDialogComponent]
})
export class AdddialogModule { }
