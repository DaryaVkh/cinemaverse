import { AbstractControl, FormControl } from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk';
import { Month } from 'src/models/movies.models';

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function getCurrentMonth(): Month {
  const currentMonth = new Date().getMonth();
  switch (currentMonth) {
    case 0:
      return Month.JANUARY;
    case 1:
      return Month.FEBRUARY;
    case 2:
      return Month.MARCH;
    case 3:
      return Month.APRIL;
    case 4:
      return Month.MAY;
    case 5:
      return Month.JUNE;
    case 6:
      return Month.JULY;
    case 7:
      return Month.AUGUST;
    case 8:
      return Month.SEPTEMBER;
    case 9:
      return Month.OCTOBER;
    case 10:
      return Month.NOVEMBER;
    case 11:
      return Month.DECEMBER;
    default:
      return Month.JANUARY;
  }
}

export function getError(control: FormControl, showError: boolean, errorsMap: Record<string, string>): TuiValidationError | null {
  if (!control || !showError || (!control.touched && !showError)) {
    return null;
  }
  for (const [error, msg] of Object.entries(errorsMap)) {
    if (control.hasError(error)) {
      return new TuiValidationError(msg);
    }
  }
  return null;
}
