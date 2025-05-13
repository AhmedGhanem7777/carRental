import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsLoadingService {
  private _isLoading = signal<boolean>(false)

  get isLoading(){
    return this._isLoading
  }

  setLoading(state:boolean){
    this._isLoading.set(state)
  }
}
