import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: VehiclesComponent,title:'Vehicles' },
  { path: 'vehicle-details/:id', component: VehicleDetailsComponent,title:'Vehicle Details' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
