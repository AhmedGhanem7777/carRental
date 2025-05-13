import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuelTypesService {

  constructor(private _HttpClient:HttpClient) { }

  getAllFuelTypes():Observable<any>{
    return this._HttpClient.get<any>(`/api/FuelTypeAPI/All`)
  }
  deleteFuelType(id:any):Observable<any>{
    return this._HttpClient.delete<any>(`/api/FuelTypeAPI/${id}`)
  }

  updateFuelType(id: any, name: any): Observable<any> {
    return this._HttpClient.put(`/api/FuelTypeAPI/${id}`, JSON.stringify(name), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  
  addFuelType(fuelType:any):Observable<any>{
    return this._HttpClient.post<any>(`/api/FuelTypeAPI`,{
      fuelType:fuelType
    })
  }
}
