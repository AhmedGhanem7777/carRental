import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDeleteVehicle, IVehicle } from '../../../interfaces/customer/vehicle.interface';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private _HttpClient: HttpClient) { }

  getAllVehicles(): Observable<IVehicle[]> {
    return this._HttpClient.get<IVehicle[]>('/api/Vehicle/All')
  }

  getVehicleById(id: string): Observable<IVehicle> {
    return this._HttpClient.get<IVehicle>(`/api/Vehicle/${id}`)
  }

  deleteVehicle(id: string): Observable<IDeleteVehicle> {
    return this._HttpClient.delete<IDeleteVehicle>(`/api/Vehicle/${id}`)
  }

  addVehicle(vehicleData: FormData): Observable<IVehicle> {
    return this._HttpClient.post<IVehicle>(`/api/Vehicle`, vehicleData)
  }

  editVehicle(id: string, vehicleData: FormData): Observable<any> {
    return this._HttpClient.put<any>(`/api/Vehicle/${id}`, vehicleData)
  }

  uploadVehicleImage(vehicleId: string, file: File) {
    const formData = new FormData();
    formData.append('imageFile', file);
    formData.append('vehicleId', vehicleId.toString());
    const params = new HttpParams().set('vehicleId', vehicleId.toString());

    return this._HttpClient.post(
      '/api/Vehicle/Upload-Vehicle-Image',
      formData,
      { params }
    );
  }












  getVehiclesByCategory(categoryId: any): Observable<any> {
    return this._HttpClient.get<any>(`/api/Categories/${categoryId}/Vehicles`)
  }
  getCategories(): Observable<any> {
    return this._HttpClient.get<any>('/api/Categories/All')
  }
}
