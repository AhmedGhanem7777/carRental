import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  { path: 'categories', component: CategoryComponent, title:'Categories' },
  { path: 'category-details/:id', component: CategoryDetailsComponent, title: 'Category Details' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
