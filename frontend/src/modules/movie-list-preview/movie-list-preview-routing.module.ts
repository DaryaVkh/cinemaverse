import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListPreviewComponent } from './movie-list-preview.component';

const routes: Routes = [
  {
    path: '',
    component: MovieListPreviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieListPreviewRoutingModule {}
