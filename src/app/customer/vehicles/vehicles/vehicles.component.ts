import { Component, OnInit, Signal, signal } from '@angular/core';
import { VehicleService } from '../../../core/services/customer/Vehicle/vehicle.service';
import { IVehicle } from '../../../core/interfaces/customer/vehicle.interface';
import { IsLoadingService } from '../../../core/services/common/is-loading.service';

@Component({
  selector: 'app-vehicles',
  standalone: false,
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent implements OnInit{
  allVehicles:IVehicle[] = []
  
  constructor(private _VehicleService:VehicleService,public _IsLoadingService:IsLoadingService){}
  ngOnInit(): void {
    this.getAllVehicles()
  }

  getAllVehicles(){
    this._IsLoadingService.setLoading(true)
    this._VehicleService.getAllVehicles().subscribe({
      next:(res)=>{
        console.log('All Vehicles',res);
        this.allVehicles = res
      },error:(err)=>{
        console.log(err);
        
      },complete:()=>{
        this._IsLoadingService.setLoading(false)

      }
    })
  }
}
