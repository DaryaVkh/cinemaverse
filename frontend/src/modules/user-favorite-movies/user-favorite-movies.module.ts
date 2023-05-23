import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiHintModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { LoaderModule } from '../../components/loader/loader.module';
import { UserFavoriteMoviesRoutingModule } from './user-favorite-movies-routing.module';
import { UserFavoriteMoviesComponent } from './user-favorite-movies.component';


@NgModule({
  declarations: [
    UserFavoriteMoviesComponent
  ],
  imports: [
    CommonModule,
    UserFavoriteMoviesRoutingModule,
    TuiSvgModule,
    TuiBadgeModule,
    TuiHintModule,
    LoaderModule
  ]
})
export class UserFavoriteMoviesModule {}
