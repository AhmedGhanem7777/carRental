import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryComponent } from './category/category.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    CategoryComponent,
    CategoryDetailsComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
]
})
export class CategoriesModule { }
