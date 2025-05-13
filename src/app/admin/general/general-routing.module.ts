import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', canActivate:[adminGuard], component: DashboardComponent, title: 'Dasboard' },
  { path: 'users', canActivate:[adminGuard], component: UsersComponent, title: 'Users' },
  { path: '**', component: NotFoundComponent, title: 'Error 404' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
