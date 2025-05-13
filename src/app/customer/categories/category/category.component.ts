import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/customer/categories/category.service';
import { IsLoadingService } from '../../../core/services/common/is-loading.service';
import { ICategory } from '../../../core/interfaces/admin/category.interface';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{
  categories:ICategory[] = [] 

  constructor(private _CategoryService: CategoryService,public _IsLoadingService:IsLoadingService) { }

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories() {
    this._IsLoadingService.setLoading(true)
    this._CategoryService.getCategories().subscribe({
      next: (res) => {
        console.log('res cat',res);
        
        this.categories = res 
      },
      error: (err) => {
      },complete:()=>{
        this._IsLoadingService.setLoading(false)

      }
    });
  }
}
