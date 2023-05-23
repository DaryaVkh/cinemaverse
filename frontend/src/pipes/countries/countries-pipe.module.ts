import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesPipe } from './countries.pipe';


@NgModule({
  declarations: [
    CountriesPipe
  ],
  exports: [
    CountriesPipe
  ],
  imports: [
    CommonModule
  ]
})
export class CountriesPipeModule {}
