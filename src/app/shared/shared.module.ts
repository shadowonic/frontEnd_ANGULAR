import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module'
import { AngularModule } from './angular/angular.module'
import {StoreModule} from './store/store.module'
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    AngularModule
  ],
  exports: [MaterialModule, AngularModule, StoreModule]

})
export class SharedModule { }
