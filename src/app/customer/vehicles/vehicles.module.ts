import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { SharedModule } from '../../shared/shared.module';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';


@NgModule({
  declarations: [
    VehiclesComponent,
    VehicleDetailsComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    SharedModule
  ]
})
export class VehiclesModule { }
