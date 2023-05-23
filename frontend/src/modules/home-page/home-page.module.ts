import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiCarouselModule, TuiPaginationModule } from '@taiga-ui/kit';
import { LoaderModule } from '../../components/loader/loader.module';
import { GenresPipeModule } from '../../pipes/genres/genres-pipe.module';
import { MovieListPreviewModule } from '../movie-list-preview/movie-list-preview.module';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    TuiCarouselModule,
    TuiPaginationModule,
    LoaderModule,
    TuiButtonModule,
    GenresPipeModule,
    MovieListPreviewModule,
    MovieListPreviewModule
  ]
})
export class HomePageModule {}
