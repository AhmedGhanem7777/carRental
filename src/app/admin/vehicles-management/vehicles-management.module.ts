import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesManagementRoutingModule } from './vehicles-management-routing.module';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ManageVehicleComponent } from './manage-vehicle/manage-vehicle.component';
import { CategoriesComponent } from './categories/categories.component';
import { FuelTypesComponent } from './fuel-types/fuel-types.component';


@NgModule({
  declarations: [
    VehiclesComponent,
    ManageVehicleComponent,
    CategoriesComponent,
    FuelTypesComponent,
  ],
  imports: [
    CommonModule,
    VehiclesManagementRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class VehiclesManagementModule { }
