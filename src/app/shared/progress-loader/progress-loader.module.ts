import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProgressLoaderComponent } from './component/progress-loader.component';

@NgModule({
  declarations: [ProgressLoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [ProgressLoaderComponent]
})
export class ProgressLoaderModule { }
