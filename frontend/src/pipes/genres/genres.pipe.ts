import { Pipe, PipeTransform } from '@angular/core';
import { Genre } from '../../models/movies.models';

@Pipe({
  name: 'genres'
})
export class GenresPipe implements PipeTransform {
  public transform(genres: Genre[]): string {
    return genres.map((genre) => genre.genre).join(', ');
  }
}
