import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiDataListModule, TuiDropdownModule, TuiHostedDropdownModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { User } from '../../models/users.models';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule, TuiHostedDropdownModule, TuiDropdownModule, TuiAvatarModule, TuiDataListModule, TuiSvgModule, RouterLink],
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAvatarComponent {
  @Input() public user!: User;

  public openDropdown = false;

  constructor(private readonly userService: UserService) {}

  public logout(): void {
    this.userService.logout();
  }
}
