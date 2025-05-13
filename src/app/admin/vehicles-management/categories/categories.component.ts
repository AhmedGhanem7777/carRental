import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../../../core/services/customer/Vehicle/vehicle.service';
import { CategoryService } from '../../../core/services/customer/categories/category.service';
import { ICategory } from '../../../core/interfaces/admin/category.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  @ViewChild('fileInput') fileInput!: ElementRef;
  
  name:any
  searchInput: string = '';
  categories: ICategory[]=[];
  selectedCategory: any;
  selectedFile: File | null =null;
  isLoading: boolean = false;
  showModal: boolean = false;
  isSubmitting: boolean = false;
  imagePreview: string | null = null;
  isUpdateMode: boolean = false;
  
  categoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    CategoryImage: new FormControl(null)
  });

  constructor(private _CategoryService: CategoryService,private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getALlCategories();
  }

  getALlCategories() {
    this.isLoading = true;
    this._CategoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  addNewCategory() {
    this.isUpdateMode = false;
    this.showModal = true;
    this.categoryForm.reset();
    this.imagePreview = null;
  }

  editCategory(category: any) {
    this.isUpdateMode = true;
    this.selectedCategory = category;
    this.showModal = true;
    this.categoryForm.patchValue({
      name: category.name
    });
    this.imagePreview = category.imagePath;
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.categoryForm.patchValue({ image: file });
      
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  deleteCategory(id: string) {
    this._CategoryService.deleteCategory(id).subscribe({
      next: (res) => {
        this._ToastrService.success(`${res.message}`)
        this.getALlCategories();
      },
      error: (err) => {
        this._ToastrService.error(`An error occurred while performing the action`)
        console.log(err);
      }
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.isSubmitting = true;
      
      const formData = new FormData();
      formData.append('name', this.categoryForm.get('name')?.value);
      
      if (this.selectedFile) {
        formData.append('CategoryImage', this.selectedFile);
      }

      if (this.isUpdateMode) {
        this.name = formData.get('name')
        formData.append('id', this.selectedCategory.id);
        this._CategoryService.updateCategory(this.selectedCategory.id,this.name).subscribe({
          next: (res) => {
            console.log('ressssss',res);
            console.log('res.id',res.id);
            
            this.uploadCategoryImage(res.id,this.selectedFile)
            this.isSubmitting = false;
            this.closeModal();
          },
          error: (err) => {
            console.log(err);
            this.isSubmitting = false;
          }
        });
      } else {
        this.addCategory(formData)
      }
    }
  }

  addCategory(data:any){
    this._CategoryService.addCategory(data).subscribe({
      next: (res) => {
        this._ToastrService.success('Category has been added successfully.')
        this.isSubmitting = false;
        this.closeModal();
        this.getALlCategories();
      },
      error: (err) => {
        this._ToastrService.error(`An error occurred while performing the action`)
        console.log(err);
        this.isSubmitting = false;
      }
    });
  }



  
  uploadCategoryImage(categoryId: any, imageFile: any): void {
    this._CategoryService.uploadCategoryImage(categoryId, imageFile).subscribe({
      next: (res) => {        
        console.log('res',res);
        this.getALlCategories();
      },
      error: (err) => {
        console.error('Error uploading image:', err);
      }
    });
  }



  closeModal() {
    this.showModal = false;
    this.categoryForm.reset();
    this.imagePreview = null;
    this.isUpdateMode = false;
    this.selectedCategory = null;
  }
}
