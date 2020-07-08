import { AuthGuard } from './shared/auth.guard';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './shared/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/token.interceptor';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  //rootユーザーログイン時のみ/registerに移動できる様に変更
  {
    path: 'register',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [{ path: '', component: RegisterComponent }],
  },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [],
})
export class AuthModule {}
