import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatPaginatorModule,
  MatSortModule, MatTableModule
} from '@angular/material';
const modules = [MatButtonModule, MatTableModule, MatGridListModule, MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
];
@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class MaterialDesignModule { }
