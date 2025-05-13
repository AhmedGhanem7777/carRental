import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehiclesComponent } from '../../vehicles/vehicles/vehicles.component';
import { VehicleService } from '../../../core/services/customer/Vehicle/vehicle.service';
import { IsLoadingService } from '../../../core/services/common/is-loading.service';

@Component({
  selector: 'app-category-details',
  standalone: false,
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit{

  categories:any
  noVehicles:any

  constructor(private _ActivatedRoute:ActivatedRoute,private _VehicleService:VehicleService,public _IsLoadingService:IsLoadingService) {}

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((param)=>{
      this.getVehiclesByCategory(param['id'])
    })
  }


  getVehiclesByCategory(id:any){
    this._IsLoadingService.setLoading(true)
    this._VehicleService.getVehiclesByCategory(id).subscribe({
      next:(res)=>{
        console.log('categories',res);
        this.categories = res
      },error:(err)=>{
        console.log(err);
        this.noVehicles = err.error.message
        this._IsLoadingService.setLoading(false)
      },complete:()=>{
        this._IsLoadingService.setLoading(false)
      }
    })
  }

}
