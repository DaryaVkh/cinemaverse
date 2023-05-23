import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, catchError, of, Subject, take } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getError } from 'src/common/helpers';
import { ACCESS_TOKEN_COOKIE_NAME, EMAIL_CONTROL_ERROR, REQUIRED_CONTROL_ERROR } from '../../../common/constants';
import { ErrorCode } from '../../../common/models';
import { UserApiService } from '../../../services/api/user-api.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy {
  @Output() public successfullyLogin = new EventEmitter<void>();

  public submitted = false;

  public readonly loginError = new TuiValidationError('Login failed. Please check the validity of your email and password and try again.');
  public readonly authorizationForm = this.fb.group({
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
      updateOn: undefined
    }),
    password: this.fb.control('', {
      validators: [Validators.required],
      updateOn: undefined
    })
  });

  public readonly loading$ = new BehaviorSubject<boolean>(false);
  public readonly loginError$ = new BehaviorSubject<boolean>(false);

  public get emailError(): TuiValidationError | null {
    return getError(
      this.authorizationForm.get('email') as FormControl,
      this.submitted && !this.loginError$.getValue(),
      {
        [ErrorCode.REQUIRED]: REQUIRED_CONTROL_ERROR,
        [ErrorCode.EMAIL]: EMAIL_CONTROL_ERROR
      }
    );
  }

  public get passwordError(): TuiValidationError | null {
    return getError(
      this.authorizationForm.get('password') as FormControl,
      this.submitted && !this.loginError$.getValue(),
      {
        [ErrorCode.REQUIRED]: REQUIRED_CONTROL_ERROR,
      }
    );
  }

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly fb: FormBuilder,
              private readonly userService: UserService,
              private readonly userApiService: UserApiService,
              private readonly cookieService: CookieService) {}

  public submitForm(event: SubmitEvent): void {
    event.preventDefault();
    this.submitted = true;
    this.authorizationForm.updateValueAndValidity();
    if (this.authorizationForm.valid) {
      this.loading$.next(true);
      this.userApiService.login({
        email: this.authorizationForm.get('email')?.value?.trim() || '',
        password: this.authorizationForm.get('password')?.value?.trim() || ''
      }).pipe(
        take(1),
        takeUntil(this.destroy$),
        catchError(() => of(null))
      ).subscribe((loggedUser) => {
        if (!loggedUser) {
          this.loginError$.next(true);
          this.authorizationForm.reset();
        } else {
          this.cookieService.set(ACCESS_TOKEN_COOKIE_NAME, loggedUser.token);
          this.userService.user$.next(loggedUser);
          this.successfullyLogin.emit();
        }
        this.loading$.next(false);
      });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
