import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiHintModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { LoaderModule } from '../../components/loader/loader.module';
import { MovieListPageRoutingModule } from './movie-list-page-routing.module';
import { MovieListPageComponent } from './movie-list-page.component';


@NgModule({
  declarations: [
    MovieListPageComponent
  ],
  imports: [
    CommonModule,
    MovieListPageRoutingModule,
    TuiBadgeModule,
    TuiButtonModule,
    LoaderModule,
    TuiSvgModule,
    TuiHintModule
  ]
})
export class MovieListPageModule {}
