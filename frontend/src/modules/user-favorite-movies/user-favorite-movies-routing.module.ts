import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFavoriteMoviesComponent } from './user-favorite-movies.component';

const routes: Routes = [
  {
    path: '',
    component: UserFavoriteMoviesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserFavoriteMoviesRoutingModule {}
