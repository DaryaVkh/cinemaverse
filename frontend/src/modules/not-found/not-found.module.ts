import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';


@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    TuiButtonModule
  ]
})
export class NotFoundModule {}
