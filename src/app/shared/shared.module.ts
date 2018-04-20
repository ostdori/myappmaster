import { CommonModule } from '@angular/common';
import { DropdownDirectives } from './dropdown.directive';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [
    DropdownDirectives
  ],
  exports: [
    CommonModule,
    DropdownDirectives
  ]
})
export class SharedModule {

}
