import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token = signal<string | null>(localStorage.getItem('token'));
  token = computed(() => this._token());
  isLoggedIn = computed(() => this._token() !== null);

  constructor(private _HttpClient: HttpClient, private _Router: Router) { }

  register(userData: any): Observable<any> {
    return this._HttpClient.post<any>("/api/User/reg", userData);
  }

  login(userData: any): Observable<any> {
    return this._HttpClient.post<any>("/api/User/auth/login", userData);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('adminMail')
    localStorage.removeItem('currentEmail')
    localStorage.removeItem('userId')
    this._token.set(null);
    this._Router.navigate(['/auth'])
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this._token.set(token);
  }

}
