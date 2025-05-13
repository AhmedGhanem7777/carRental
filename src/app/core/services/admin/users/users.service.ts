import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseDeleteUser, IUser } from '../../../interfaces/admin/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient: HttpClient) { }

  getCurrentUser(id: number): Observable<IUser> {
    return this._HttpClient.get<IUser>(`/api/User/${id}`)
  }
  getAllUsers(): Observable<IUser[]> {
    return this._HttpClient.get<IUser[]>(`/api/User/All`)
  }
  deleteUser(id: number): Observable<IResponseDeleteUser> {
    return this._HttpClient.delete<IResponseDeleteUser>(`/api/User/${id}`)
  }
}
