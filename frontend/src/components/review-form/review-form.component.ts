import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiDialogModule, TuiErrorModule, TuiLabelModule } from '@taiga-ui/core';
import { TuiRatingModule, TuiTextAreaModule } from '@taiga-ui/kit';
import { Subject, take } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { REQUIRED_CONTROL_ERROR } from '../../common/constants';
import { getError } from '../../common/helpers';
import { ErrorCode } from '../../common/models';
import { Movie } from '../../models/movies.models';
import { MoviesApiService } from '../../services/api/movies-api.service';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, TuiButtonModule, TuiDialogModule, TuiRatingModule, ReactiveFormsModule, TuiTextAreaModule, TuiLabelModule, TuiErrorModule],
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewFormComponent implements OnDestroy {
  @Input() public movie!: Movie;

  @Output() public reviewSend = new EventEmitter<void>();

  public reviewFormOpen = false;
  public submitted = false;

  public readonly reviewForm = this.fb.group({
    text: this.fb.control('', {
      validators: [Validators.required],
      updateOn: undefined
    }),
    rating: this.fb.control(null, {
      validators: [Validators.required],
      updateOn: undefined
    })
  });

  public get textError(): TuiValidationError | null {
    return getError(
      this.reviewForm.get('text') as FormControl,
      this.submitted,
      {
        [ErrorCode.REQUIRED]: REQUIRED_CONTROL_ERROR,
      }
    );
  }

  public get ratingError(): TuiValidationError | null {
    return getError(
      this.reviewForm.get('rating') as FormControl,
      this.submitted,
      {
        [ErrorCode.REQUIRED]: REQUIRED_CONTROL_ERROR,
      }
    );
  }

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly fb: FormBuilder,
              private readonly moviesApiService: MoviesApiService) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openReviewFormDialog(): void {
    this.reviewFormOpen = true;
  }

  public submitReview(event: SubmitEvent): void {
    event.preventDefault();
    this.submitted = true;
    if (this.reviewForm.valid) {
      this.moviesApiService.createReview(this.movie.kinopoiskId, {
        rating: this.reviewForm.get('rating')?.value || 0,
        text: this.reviewForm.get('text')?.value || '',
      }).pipe(
        take(1),
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.reviewSend.emit();
        this.reviewForm.reset();
        this.reviewFormOpen = false;
      });
    }
  }
}
