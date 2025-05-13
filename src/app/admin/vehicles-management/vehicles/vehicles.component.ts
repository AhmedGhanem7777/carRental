import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VehicleService } from '../../../core/services/customer/Vehicle/vehicle.service';
import { IVehicle } from '../../../core/interfaces/customer/vehicle.interface';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicles',
  standalone: false,
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent implements OnInit {
  searchInput: string = '';
  vehicles: IVehicle[] = []
  selectedVehicle!: IVehicle;
  isLoading: boolean = false;
  showModal: boolean = false;
  vehicleForm!: FormGroup

  constructor(private _VehicleService: VehicleService,private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getALlVehicles();
  }

  getALlVehicles() {
    this._VehicleService.getAllVehicles().subscribe({
      next: (res) => {
        this.vehicles = res
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }


  getSpecificVehicleDetails(vehicleId: string) {
    this._VehicleService.getVehicleById(vehicleId).subscribe({
      next: (res) => {
          this.selectedVehicle = res
          this.showModal = true;
      }, error: (err) => {
        console.log(err);
      }
    })
  }


  deleteVehicle(id: string) {
    this._VehicleService.deleteVehicle(id).subscribe({
      next: (res) => {
        this._ToastrService.success(`${res.message}`)
        this.getALlVehicles()
      }, error: (err) => {
        this._ToastrService.error('An error occurred while performing the action')
        console.log(err);
      }
    })
  }

  closeModal() {
    this.showModal = false;
  }
}
