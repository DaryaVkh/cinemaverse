import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiDialogModule, TuiHintModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiBadgeModule, TuiDataListWrapperModule, TuiSelectModule, TuiTagModule } from '@taiga-ui/kit';
import { LoaderModule } from '../../components/loader/loader.module';
import { ReviewFormComponent } from '../../components/review-form/review-form.component';
import { ReviewsListComponent } from '../../components/reviews-list/reviews-list.component';
import { CountriesPipeModule } from '../../pipes/countries/countries-pipe.module';
import { GenresPipeModule } from '../../pipes/genres/genres-pipe.module';
import { MoviePageRoutingModule } from './movie-page-routing.module';
import { MoviePageComponent } from './movie-page.component';


@NgModule({
  declarations: [
    MoviePageComponent
  ],
  imports: [
    CommonModule,
    MoviePageRoutingModule,
    LoaderModule,
    TuiBadgeModule,
    TuiTagModule,
    GenresPipeModule,
    CountriesPipeModule,
    TuiButtonModule,
    ReviewsListComponent,
    TuiHintModule,
    TuiSvgModule,
    TuiDialogModule,
    ReviewFormComponent,
    TuiSelectModule,
    TuiDataListWrapperModule
  ]
})
export class MoviePageModule {}
