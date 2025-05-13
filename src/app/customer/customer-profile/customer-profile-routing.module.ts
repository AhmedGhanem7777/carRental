import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePassComponent } from './change-pass/change-pass.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: ProfileComponent, title: 'Customer Profile' },
  { path: 'change-pass', component: ChangePassComponent, title: 'Change Password' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerProfileRoutingModule { }
