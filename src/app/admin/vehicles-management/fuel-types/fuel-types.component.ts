import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../core/services/customer/categories/category.service';
import { FuelTypesService } from '../../../core/services/admin/fuel-types/fuel-types.service';

@Component({
  selector: 'app-fuel-types',
  standalone: false,
  templateUrl: './fuel-types.component.html',
  styleUrl: './fuel-types.component.scss'
})
export class FuelTypesComponent implements OnInit{
  @ViewChild('fileInput') fileInput!: ElementRef;
  
  searchInput: string = '';
  fuelTypes: any;
  selectedFuelType: any;
  selectedFile: any;
  isLoading: boolean = false;
  showModal: boolean = false;
  isSubmitting: boolean = false;
  imagePreview: string | null = null;
  isUpdateMode: boolean = false;
  
  fuelForm: FormGroup = new FormGroup({
    fuelType: new FormControl('', [Validators.required]),
  });

  constructor(private _FuelTypesService: FuelTypesService) { }

  ngOnInit(): void {
    this.getALlFuelTypes();
  }

  getALlFuelTypes() {
    this.isLoading = true;
    this._FuelTypesService.getAllFuelTypes().subscribe({
      next: (res) => {
        this.fuelTypes = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  addNewFuel() {
    this.isUpdateMode = false;
    this.showModal = true;
    this.fuelForm.reset();
    this.imagePreview = null;
  }

  editFuel(category: any) {
    this.isUpdateMode = true;
    this.selectedFuelType = category;
    this.showModal = true;
    this.fuelForm.patchValue({
      fuelType: category.fuelType
    });
    this.imagePreview = category.imagePath;
  }

  deleteFuelType(id: any) {
    this._FuelTypesService.deleteFuelType(id).subscribe({
      next: (res) => {
        this.getALlFuelTypes();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSubmit() {
    if (this.fuelForm.valid) {
      this.isSubmitting = true;
      
      const formData = new FormData();
      formData.append('fuelType', this.fuelForm.get('fuelType')?.value);
      
      // if (this.selectedFile) {
      //   formData.append('CategoryImage', this.selectedFile);
      // }

      if (this.isUpdateMode) {
        formData.append('id', this.selectedFuelType.id);
        console.log(this.selectedFuelType.id,formData.get('fuelType'));
        
        this._FuelTypesService.updateFuelType(this.selectedFuelType.id,formData.get('fuelType')).subscribe({
          next: (res) => {
            this.isSubmitting = false;
            this.closeModal();
            this.getALlFuelTypes();
          },
          error: (err) => {
            console.log(err);
            this.isSubmitting = false;
          }
        });
      } else {
        this.addFuelType(formData.get('fuelType'))
      }
    }
  }

  addFuelType(fuelType:any){
    this._FuelTypesService.addFuelType(fuelType).subscribe({
      next: (res) => {
        console.log('add fuel type',res);
        this.isSubmitting = false;
        this.closeModal();
        this.getALlFuelTypes();
      },
      error: (err) => {
        console.log(err);
        this.isSubmitting = false;
      }
    });
  }

  closeModal() {
    this.showModal = false;
    this.fuelForm.reset();
    this.imagePreview = null;
    this.isUpdateMode = false;
    this.selectedFuelType = null;
  }
}
