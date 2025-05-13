import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { noLoginGuard } from '../core/guards/no-login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'vehicles', loadChildren: () => import('./vehicles/vehicles.module').then(m => m.VehiclesModule) },
  { path: 'saved', loadChildren: () => import('./saved/saved.module').then(m => m.SavedModule) },
  { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'booking', loadChildren: () => import('./my-booking/my-booking.module').then(m => m.MyBookingModule) },
  { path: 'profile', canActivate:[noLoginGuard], loadChildren: () => import('./customer-profile/customer-profile.module').then(m => m.CustomerProfileModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
