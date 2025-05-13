import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory, IDeleteCategory } from '../../../interfaces/admin/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient:HttpClient) { }

  getCategories():Observable<ICategory[]>{
    return this._HttpClient.get<ICategory[]>(`/api/Categories/All`)
  }
  getCategoryById(id:string):Observable<ICategory>{
    return this._HttpClient.get<ICategory>(`/api/Categories/${id}`)
  }
  deleteCategory(id:string):Observable<IDeleteCategory>{
    return this._HttpClient.delete<IDeleteCategory>(`/api/Categories/${id}`)
  }
  updateCategory(id:string,name:any):Observable<any>{
    return this._HttpClient.put<any>(`/api/Categories/${id}`,{
      name:name
    })
  }
  addCategory(categoryData:any):Observable<any>{
    return this._HttpClient.post<any>(`/api/Categories`,categoryData)
  }

  
  uploadCategoryImage(categoryId: number, file: File) {
    const formData = new FormData();
    formData.append('imageFile', file); 
    formData.append('categoryId', categoryId.toString());

    const params = new HttpParams().set('categoryId', categoryId.toString());

    return this._HttpClient.post(
      '/api/Categories/Upload-Category-Image',
      formData,
      { params }
    );
  }
}
