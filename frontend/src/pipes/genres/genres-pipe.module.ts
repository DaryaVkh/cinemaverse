import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenresPipe } from './genres.pipe';



@NgModule({
  declarations: [
    GenresPipe
  ],
  exports: [
    GenresPipe
  ],
  imports: [
    CommonModule
  ]
})
export class GenresPipeModule { }
