import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SavedService {

  constructor(private _HttpClient: HttpClient) { }

  getLoggedUserData(userId: any): Observable<any> {
    return this._HttpClient.get<any>(`/api/Cart/${userId}/Items`)
  }
  removeVehicle(userId: any, vehicleId: any): Observable<any> {
    return this._HttpClient.delete<any>(`/api/Cart?userId=${userId}&vehicleId=${vehicleId}`)
  }
  addToSaved(userId: any, vehicleId: any): Observable<any> {
    return this._HttpClient.post<any>(`/api/Cart?userId=${userId}&vehicleId=${vehicleId}`, {})
  }
  updateVehicle(userId: any, vehicleId: any, quantity:any): Observable<any> {
    return this._HttpClient.put<any>(`/api/Cart`, {
      userId:userId,
      vehicleId:vehicleId,
      quantity:quantity
    })
  }
}
