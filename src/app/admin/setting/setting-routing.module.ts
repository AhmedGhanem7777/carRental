import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'change-pass', pathMatch: 'full' },
  { path: 'change-pass', component: ChangePassComponent, title: 'Change Password' },
  { path: 'profile', component: ProfileComponent, title: 'Profile' },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
