import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TuiButtonModule, TuiDialogModule, TuiHintModule, TuiSvgModule } from '@taiga-ui/core';
import { BehaviorSubject, combineLatestWith, of, shareReplay, startWith, Subject, switchMap, tap } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Review } from '../../models/movies.models';
import { MoviesApiService } from '../../services/api/movies-api.service';
import { LoaderModule } from '../loader/loader.module';

@Component({
  selector: 'app-reviews-list',
  standalone: true,
  imports: [CommonModule, LoaderModule, TuiButtonModule, TuiSvgModule, TuiDialogModule, TuiHintModule],
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsListComponent implements OnInit {
  @Input() public updateTrigger$!: Subject<void>;

  public maxReviewsCount = 0;
  public dialogReview: Review | null = null;

  public readonly reviewsPerPage = 4;

  public readonly movieId$ = this.route.paramMap.pipe(
    map(paramMap => paramMap.get('id')),
    shareReplay({bufferSize: 1, refCount: true})
  );

  public readonly reviews$ = new BehaviorSubject<Review[]>([]);
  public readonly reviewsPart$ = new BehaviorSubject<number>(1);
  public readonly page$ = new BehaviorSubject<number>(1);
  public readonly loading$ = new BehaviorSubject<boolean>(false);

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly route: ActivatedRoute,
              private readonly moviesApiService: MoviesApiService) {}

  public ngOnInit(): void {
    this.movieId$.pipe(
      combineLatestWith(this.updateTrigger$.pipe(
        startWith(0)
      )),
      tap(() => {
        this.reviews$.next([]);
        this.reviewsPart$.next(1);
        this.page$.next(1);
        this.maxReviewsCount = 0;
      }),
      combineLatestWith(this.page$),
      tap(() => this.loading$.next(true)),
      switchMap(([[movieId,], page]) => movieId ? this.moviesApiService.getReviews(movieId, page) : of(null)),
      takeUntil(this.destroy$)
    ).subscribe((result) => {
      if (result) {
        const prevLoadedMovies = this.reviews$.getValue();
        this.reviews$.next([...prevLoadedMovies, ...result.items]);
        this.maxReviewsCount = result.total;
        this.loading$.next(false);
      }
    });
  }

  public nextPart(): void {
    const reviews = this.reviews$.getValue();
    const reviewsCount = reviews.length;
    const currentPage = this.page$.getValue();
    const currentPart = this.reviewsPart$.getValue();
    if (!reviews.slice(currentPart * this.reviewsPerPage, (currentPart + 1) * this.reviewsPerPage).length
      && reviewsCount < this.maxReviewsCount) {
      this.page$.next(currentPage + 1);
    }
    this.reviewsPart$.next(currentPart + 1);
  }

  public prevPart(): void {
    const currentPart = this.reviewsPart$.getValue();
    if (currentPart > 1) {
      this.reviewsPart$.next(currentPart - 1);
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
