import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { ManageVehicleComponent } from './manage-vehicle/manage-vehicle.component';
import { CategoriesComponent } from './categories/categories.component';
import { FuelTypesComponent } from './fuel-types/fuel-types.component';

const routes: Routes = [
  { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
  { path: 'vehicles', component: VehiclesComponent, title: 'Vehicles' },
  { path: 'manage-vehicle/:id', component: ManageVehicleComponent, title: 'Edit Vehicle' },
  { path: 'manage-vehicle', component: ManageVehicleComponent, title: 'Add Vehicle' },
  { path: 'categories', component: CategoriesComponent, title: 'Categories' },
  { path: 'fuelTypes', component: FuelTypesComponent, title: 'Fuel Types' },
  { path: '**', component: NotFoundComponent, title: 'Error 404' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesManagementRoutingModule { }
