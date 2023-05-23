import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiButtonModule, TuiHintModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { LoaderModule } from '../../components/loader/loader.module';
import { MovieListPreviewRoutingModule } from './movie-list-preview-routing.module';
import { MovieListPreviewComponent } from './movie-list-preview.component';


@NgModule({
  declarations: [
    MovieListPreviewComponent
  ],
  exports: [
    MovieListPreviewComponent
  ],
  imports: [
    CommonModule,
    MovieListPreviewRoutingModule,
    TuiButtonModule,
    LoaderModule,
    TuiBadgeModule,
    TuiSvgModule,
    TuiHintModule,
  ]
})
export class MovieListPreviewModule {}
