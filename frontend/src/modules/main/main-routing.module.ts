import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        pathMatch: 'full',
        loadChildren: () => import('../home-page/home-page.module').then(m => m.HomePageModule)
      },
      {
        path: 'movie-list',
        loadChildren: () => import('../movie-list-page/movie-list-page.module').then(m => m.MovieListPageModule)
      },
      {
        path: 'movie-page/:id',
        loadChildren: () => import('../movie-page/movie-page.module').then(m => m.MoviePageModule)
      },
      {
        path: 'person-page/:id',
        loadChildren: () => import('../person-page/person-page.module').then(m => m.PersonPageModule)
      },
      {
        path: 'my-favorites',
        loadChildren: () => import('../user-favorite-movies/user-favorite-movies.module').then(m => m.UserFavoriteMoviesModule),
        canLoad: [AuthGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
