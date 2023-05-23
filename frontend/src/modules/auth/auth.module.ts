import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiDialogModule, TuiErrorModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { LoaderModule } from '../../components/loader/loader.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth.component';


@NgModule({
  declarations: [AuthComponent, LoginComponent, RegistrationComponent],
  exports: [AuthComponent],
  imports: [
    CommonModule,
    TuiDialogModule,
    TuiButtonModule,
    ReactiveFormsModule,
    TuiErrorModule,
    TuiInputModule,
    TuiInputPasswordModule,
    LoaderModule
  ]
})
export class AuthModule {}
