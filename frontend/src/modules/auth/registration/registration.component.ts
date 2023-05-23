import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk';
import { BehaviorSubject, catchError, of, Subject, take } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EMAIL_CONTROL_ERROR, REQUIRED_CONTROL_ERROR } from '../../../common/constants';
import { getError } from '../../../common/helpers';
import { ErrorCode } from '../../../common/models';
import { UserApiService } from '../../../services/api/user-api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnDestroy {
  @Output() public successfullyRegister = new EventEmitter<void>();

  public submitted = false;

  public readonly registrationError = new TuiValidationError('Registration failed. User with this email is already registered.');
  public readonly registrationForm = this.fb.group({
    name: this.fb.control('', {
      validators: [Validators.required],
      updateOn: undefined
    }),
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
      updateOn: undefined
    }),
    password: this.fb.control('', {
      validators: [Validators.required],
      updateOn: undefined
    }),
    repeatedPassword: this.fb.control('', {
      validators: [Validators.required],
      updateOn: undefined
    }),
  });

  public readonly registrationError$ = new BehaviorSubject<boolean>(false);
  public readonly loading$ = new BehaviorSubject<boolean>(false);

  public get nameError(): TuiValidationError | null {
    return getError(
      this.registrationForm.get('name') as FormControl,
      this.submitted && !this.registrationError$.getValue(),
      {
        [ErrorCode.REQUIRED]: REQUIRED_CONTROL_ERROR,
      }
    );
  }

  public get emailError(): TuiValidationError | null {
    return getError(
      this.registrationForm.get('email') as FormControl,
      this.submitted && !this.registrationError$.getValue(),
      {
        [ErrorCode.REQUIRED]: REQUIRED_CONTROL_ERROR,
        [ErrorCode.EMAIL]: EMAIL_CONTROL_ERROR
      }
    );
  }

  public get passwordError(): TuiValidationError | null {
    return getError(
      this.registrationForm.get('password') as FormControl,
      this.submitted && !this.registrationError$.getValue(),
      {
        [ErrorCode.REQUIRED]: REQUIRED_CONTROL_ERROR,
      }
    );
  }

  public get repeatedPasswordError(): TuiValidationError | null {
    const automaticCheckError = getError(
      this.registrationForm.get('repeatedPassword') as FormControl,
      this.submitted && !this.registrationError$.getValue(),
      {
        [ErrorCode.REQUIRED]: REQUIRED_CONTROL_ERROR,
      }
    );
    if (!automaticCheckError && this.registrationForm.get('repeatedPassword')?.value === this.registrationForm.get('password')?.value) {
      return null;
    }
    return automaticCheckError || new TuiValidationError('Passwords should be equal');
  }

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly fb: FormBuilder,
              private readonly userApiService: UserApiService) {}

  public submitForm(event: SubmitEvent): void {
    event.preventDefault();
    this.submitted = true;
    this.registrationForm.updateValueAndValidity();
    if (this.registrationForm.valid) {
      this.loading$.next(true);
      this.userApiService.register({
        name: this.registrationForm.get('name')?.value?.trim() || '',
        email: this.registrationForm.get('email')?.value?.trim() || '',
        password: this.registrationForm.get('password')?.value?.trim() || ''
      }).pipe(
        take(1),
        takeUntil(this.destroy$),
        catchError(() => of(null))
      ).subscribe((createdUser) => {
        if (!createdUser) {
          this.registrationError$.next(true);
          this.registrationForm.reset();
        } else {
          this.successfullyRegister.emit();
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
