import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiDialogFormService } from '@taiga-ui/kit';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDialogFormService],
})
export class AuthComponent {
  public loginDialogOpen = false;
  public registrationDialogOpen = false;

  public showLogin(): void {
    this.loginDialogOpen = true;
  }
}
