import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../../core/services/customer/Vehicle/vehicle.service';
import { CategoryService } from '../../../core/services/customer/categories/category.service';
import { FuelTypesService } from '../../../core/services/admin/fuel-types/fuel-types.service';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from '../../../core/interfaces/admin/category.interface';
import { IFuelType } from '../../../core/interfaces/admin/fuel.interface';
import { IVehicle } from '../../../core/interfaces/customer/vehicle.interface';

@Component({
  selector: 'app-manage-vehicle',
  standalone: false,
  templateUrl: './manage-vehicle.component.html',
  styleUrl: './manage-vehicle.component.scss'
})
export class ManageVehicleComponent implements OnInit {
  addMode = signal<boolean | null>(true)
  selectedFile: File | null = null
  categories: ICategory[] = []

  vehicleId: string = '';
  files: File[] = [];
  previewUrls: string[] = [];
  imgSrc: string[] = []
  FuelType: IFuelType[] = []
  currentVehicleData!: IVehicle;

  addVehicleForm = new FormGroup({
    make: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    mileage: new FormControl('', [Validators.required]),
    fuelTypeID: new FormControl('', [Validators.required]),
    plateNumber: new FormControl('', [Validators.required]),
    vehicleCategoryID: new FormControl('', [Validators.required]),
    rentalPricePerDay: new FormControl('', [Validators.required]),
    isAvailableForRent: new FormControl(true, [Validators.required]),
    VehicleImage: new FormControl(null),
    features: new FormControl('', [Validators.required]),
  })

  constructor(
    private _VehicleService: VehicleService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _CategoryService: CategoryService,
    private _ToastrService: ToastrService,
    private _FuelTypesService: FuelTypesService
  ) {
    this.vehicleId = _ActivatedRoute.snapshot.params['id'];
    if (this.vehicleId) {
      this.addMode.set(false)
      this.getVehicleById(this.vehicleId);
    } else {
      this.addMode.set(true)
    }
  }

  ngOnInit(): void {
    this.getFuelType();
    this.getAllCategories();
  }

  onSubmit(vehicleData: FormGroup) {
    if (this.addVehicleForm.valid) {
      const data = vehicleData.value
      let myData = new FormData();

      Object.keys(data).forEach(key => {
        if (key !== 'VehicleImage') {
          myData.append(key, data[key]);
        }
      });

      if (this.selectedFile) {
        myData.append('VehicleImage', this.selectedFile);
      }

      if (this.vehicleId) {
        this.updateVehicle(this.vehicleId,vehicleData.value)
      } else {
        this.addVehicle(myData)
      }
    }
  }

  addVehicle(vehicleData:FormData){
    this._VehicleService.addVehicle(vehicleData).subscribe({
      next: (res) => {
        console.log('add',res);
        
        this._ToastrService.success('Vehicle added successfully')
        this._Router.navigate(['/admin/vehicles-management']);
      },
      error: (err) => {
        this._ToastrService.error('An error occurred while performing the action')
        console.log(err);
      }
    });
  }

  updateVehicle(vehicleId:string,vehicleData:FormData){
    this._VehicleService.editVehicle(vehicleId, vehicleData).subscribe({
      next: (res) => {
        console.log('edit',res);

        // If there's a new image, upload it
        if (this.selectedFile) {

          this._VehicleService.uploadVehicleImage(res.vehicleID, this.selectedFile).subscribe({
            next: (imageRes) => {
              
              this._ToastrService.success('Vehicle updated successfully')
              this._Router.navigate(['/admin/vehicles-management']);
            },
            error: (err) => {
              this._ToastrService.error('An error occurred while performing the action')
              console.log('Error updating image:', err);
            }
          });
        } else {
          this._Router.navigate(['/admin/vehicles-management']);
        }
      },
      error: (err) => {
        console.log('Error updating vehicle:', err);
      }
    });
  }

  getFuelType() {
    this._FuelTypesService.getAllFuelTypes().subscribe({
      next: (res: any) => {
        console.log('res',res);
        
        this.FuelType = res;
      }
    })
  }

  getVehicleById(id: string) {
    this._VehicleService.getVehicleById(id).subscribe({
      next: (res: any) => {
        console.log('res res',res);
        
        this.currentVehicleData = res;
        this.populateFormData(res);
        if (res.imagePath) {
          this.previewUrls = [res.imagePath];
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  populateFormData(data: any) {
    this.addVehicleForm.patchValue({
      make: data.make,
      model: data.model,
      year: data.year,
      mileage: data.mileage,
      fuelTypeID: data.fuelTypeID,
      plateNumber: data.plateNumber,
      vehicleCategoryID: data.vehicleCategoryID,
      rentalPricePerDay: data.rentalPricePerDay,
      isAvailableForRent: data.isAvailableForRent,
      features: data.features
    });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = event.target as HTMLElement;
    dropzone.classList.add('dragover');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = event.target as HTMLElement;
    dropzone.classList.remove('dragover');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = event.target as HTMLElement;
    dropzone.classList.remove('dragover');

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(Array.from(files));
    }
  }

  handleFiles(files: File[]) {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    this.files.push(...imageFiles);

    for (const file of imageFiles) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrls.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  onRemove(index: number) {
    if (index < this.files.length) {
      this.files.splice(index, 1);
    }
    this.previewUrls.splice(index, 1);

    if (index < this.imgSrc.length) {
      this.imgSrc.splice(index, 1);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrls = [e.target.result];
      };
      reader.readAsDataURL(file);
    }
  }

  resetForm() {
    this.addVehicleForm.reset();
    this.previewUrls = [];
    this.files = [];
    this.selectedFile = null;

    if (!this.addMode()) {
      this.populateFormData(this.currentVehicleData);
      if (this.currentVehicleData.imagePath) {
        this.previewUrls = [this.currentVehicleData.imagePath];
      }
    }
  }

  getAllCategories() {
    this._CategoryService.getCategories().subscribe({
      next: (res) => {
        console.log('res',res);
        
        this.categories = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  uploadNewVehicleImage(id: any, imageFile: File) {
    this._VehicleService.uploadVehicleImage(id, imageFile).subscribe({
      next: (res) => {
        console.log('upload image', res);

      }, error: (err) => {
        console.log(err);

      }
    })
  }
}
