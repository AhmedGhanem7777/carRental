import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';

const routes: Routes = [
  { path: '', redirectTo: 'login-register', pathMatch: 'full' },
  { path: 'login-register', component: LoginRegisterComponent, title: 'Login' },
  { path: 'forgot-pass', component: ForgotPassComponent, title: 'Forgot Password' },
  { path: 'verify-email', component: VerifyEmailComponent, title: 'Verify Email' },
  { path: 'reset-pass', component: ResetPassComponent, title: 'Reset Password' },
  { path: '**', component: NotFoundComponent, title: 'Page Not Found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
