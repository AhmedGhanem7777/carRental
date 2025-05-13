import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../../core/services/customer/Vehicle/vehicle.service';
import { IVehicle } from '../../../core/interfaces/customer/vehicle.interface';
import { IsLoadingService } from '../../../core/services/common/is-loading.service';

@Component({
  selector: 'app-vehicle-details',
  standalone: false,
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.scss'
})
export class VehicleDetailsComponent implements OnInit {
  vehicleId: string | null = null
  vehicleData!: IVehicle;
  selectedImageIndex = 0;
  visibleThumbnails: number[] = [];
  showBookingForm = false;
  isLoading: boolean = false

  filteredVehicles: any
  selectedCategory: any
  currentCategoryName: any
  currentCategoryId: any
  categories: any[] = []
  categoriesById: any[] = []

  constructor(private _ActivatedRoute: ActivatedRoute, public _IsLoadingService: IsLoadingService, private _VehicleService: VehicleService, private _Router: Router) { }

  ngOnInit(): void {
    this.getVehicleId();
  }


  getVehicleId() {
    this._ActivatedRoute.paramMap.subscribe(
      (param) => {
        this.vehicleId = param.get('id');
        if (this.vehicleId) {
          this.getVehicleById(this.vehicleId);
        }
      }
    );
  }


  getVehicleById(id: string) {
    this._IsLoadingService.setLoading(true)

    this._VehicleService.getVehicleById(id).subscribe({
      next: (res) => {
        console.log('res', res);
        this.currentCategoryName = res.categoryName
        this.isLoading = false
        this.vehicleData = res

        this.getCategories()

        console.log('vehicle specific', res);
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false
      }, complete: () => {
      }
    });
  }

  getCategories() {
    this._VehicleService.getCategories().subscribe({
      next: (res) => {
        console.log('Categories', res);
        this.categories = res
        this.selectedCategory = this.categories.find(c => c.name == this.currentCategoryName)
        this.currentCategoryId = this.selectedCategory.id
        console.log('selectedCategory',this.currentCategoryId);
        
        this.getVehiclesByCategory(this.currentCategoryId)
      }, error: (err) => {
        console.log(err);
        
      }
    })
  }
  getVehiclesByCategory(categoryId: any) {
    this._VehicleService.getVehiclesByCategory(categoryId).subscribe({
      next:(res)=>{
        console.log('Category By Id',res);
        this.categoriesById = res
      },error:(err)=>{
        console.log(err);
        
      },complete:()=>{
        this._IsLoadingService.setLoading(false)
      }
    })
  }


  setSelectedImage(index: number) {
    this.selectedImageIndex = index;
  }



  toggleBookingForm() {
    if (!this.vehicleData.isAvailableForRent) {
      this.showBookingForm = !this.showBookingForm;
    }
  }
}
