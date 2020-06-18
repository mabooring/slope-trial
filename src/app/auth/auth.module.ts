import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './shared/auth.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
  providers: [AuthService],
  bootstrap: [],
})
export class AuthModule {}
