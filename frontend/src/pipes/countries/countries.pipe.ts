import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../../models/movies.models';

@Pipe({
  name: 'countries'
})
export class CountriesPipe implements PipeTransform {
  public transform(countries: Country[]): string {
    return countries.map((country) => country.country).join(', ');
  }
}
