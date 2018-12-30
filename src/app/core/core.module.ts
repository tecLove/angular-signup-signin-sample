import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FormErrorStateMatcher } from './form-error-state-matcher.service';
import { RestApiService } from './rest-api/service/rest-api.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [RestApiService, FormErrorStateMatcher]
})
export class CoreModule { }
