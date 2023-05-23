import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule } from '@taiga-ui/core';
import { PersonPageRoutingModule } from './person-page-routing.module';
import { PersonPageComponent } from './person-page.component';


@NgModule({
  declarations: [
    PersonPageComponent
  ],
  imports: [
    CommonModule,
    PersonPageRoutingModule,
    TuiButtonModule
  ]
})
export class PersonPageModule {}
