import { Component, input, Input, OnInit } from '@angular/core';
import { VehicleService } from '../../../core/services/customer/Vehicle/vehicle.service';
import { IVehicle } from '../../../core/interfaces/customer/vehicle.interface';
import { SavedService } from '../../../core/services/customer/saved/saved.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicle-card',
  standalone: false,
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.scss'
})
export class VehicleCardComponent implements OnInit{
  currentUser:any
  isSaved: boolean = false
  @Input() transferSpacificVehicles!: IVehicle

  constructor(private _SavedService:SavedService,private _ToastrService:ToastrService,private _VehicleService:VehicleService){}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('userId')

    // this.allVehiclesIsAddedToSave()
  }

  saveVehicle() {
    this.isSaved = !this.isSaved
  }

  allVehiclesIsAddedToSave(){
    this._SavedService.getLoggedUserData(this.currentUser).subscribe({
      next:(res)=>{
        console.log('is saved',res);
        this.saveVehicle()
        // this.isSaved = res.data[0].quantity > 0 ? true : false
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

  addToSaved(userId:any,vehicleId:any){   
    this._SavedService.addToSaved(userId,vehicleId).subscribe({
      next:(res)=>{
        console.log('add to save',res);
        this.isSaved = true
        this._ToastrService.success('Vehicle added to cart successfully!')
      },error:(err)=>{
        console.log(err);
        this._ToastrService.error(err.error.message)
      }
    })
  }
}

