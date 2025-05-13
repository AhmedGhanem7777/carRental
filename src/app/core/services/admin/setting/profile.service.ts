import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../../interfaces/admin/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _HttpClient: HttpClient) { }

  getCurrentUser(id: any): Observable<any> {
    return this._HttpClient.get<any>(`/api/User/${id}`)
  }

  editMyProfile(id: any, newUserData: any): Observable<any> {
    return this._HttpClient.put<any>(`/api/User/${id}`, newUserData)
  }

  updateUserProfile(id: any, newUserData: any): Observable<any> {
    return this._HttpClient.put<any>(`/api/User/${id}`, newUserData)
  }

  changePassword(newPass: any): Observable<any> {
    return this._HttpClient.put<any>(`/api/User/auth/Reset-Password`, newPass)
  }

  uploadUserImage(userId: number, file: File) {
    const formData = new FormData();
    formData.append('imageFile', file); 
    formData.append('userId', userId.toString());

    const params = new HttpParams().set('userId', userId.toString());

    return this._HttpClient.post(
      '/api/User/Upload-User-Image',
      formData,
      { params }
    );
  }
}
