import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { adminGuard } from '../core/guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: MainComponent, children: [
      { path: '', redirectTo: 'general', pathMatch: 'full' },
      { path: 'general', canActivate:[adminGuard], loadChildren: () => import('./general/general.module').then(m => m.GeneralModule) },
      { path: 'vehicles-management', canActivate:[adminGuard], loadChildren: () => import('./vehicles-management/vehicles-management.module').then(m => m.VehiclesManagementModule) },
      { path: 'booking', canActivate:[adminGuard], loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule) },
      { path: 'setting', canActivate:[adminGuard], loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule) },
      { path: '**', component: NotFoundComponent, title: 'Error 404' }
    ]
  },
  { path: '**', component: NotFoundComponent, title: 'Error 404' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
