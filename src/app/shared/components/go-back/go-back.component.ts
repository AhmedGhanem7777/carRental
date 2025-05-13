import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-go-back',
  standalone: false,
  templateUrl: './go-back.component.html',
  styleUrl: './go-back.component.scss'
})
export class GoBackComponent {

  constructor(private _Location:Location){}

  goBack(){
    this._Location.back()
  }
}
