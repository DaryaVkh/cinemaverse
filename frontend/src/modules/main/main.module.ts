import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiModeModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiAvatarModule, TuiInputModule } from '@taiga-ui/kit';
import { FiltersSidebarComponent } from '../../components/filters-sidebar/filters-sidebar.component';
import { UserAvatarComponent } from '../../components/user-avatar/user-avatar.component';
import { AuthModule } from '../auth/auth.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    TuiButtonModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    FormsModule,
    TuiAvatarModule,
    TuiModeModule,
    AuthModule,
    UserAvatarComponent,
    FiltersSidebarComponent,
    TuiSidebarModule,
    TuiActiveZoneModule,
  ]
})
export class MainModule {}
