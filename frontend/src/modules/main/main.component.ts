import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieType } from '../../models/movies.models';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  public readonly user$ = this.userService.user$;

  public searchInputVisible = false;
  public searchQuery = '';
  public open = false;

  public readonly movieTypeEnum = MovieType;

  constructor(private readonly userService: UserService,
              private readonly router: Router) {}

  public searchFilms(): void {
    if (this.searchQuery) {
      this.router.navigate(['.', 'movie-list'], {
        queryParams:  {
          keyword: this.searchQuery,
        }
      }).then();
      this.searchQuery = '';
    }
  }

  public searchClick(): void {
    if (!this.searchInputVisible) {
      this.searchInputVisible = true;
    } else {
      this.searchFilms();
    }
  }

  public openSidebar(open: boolean): void {
    this.open = open;
  }
}
