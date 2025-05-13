import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../core/services/customer/Vehicle/vehicle.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-featured-cars',
  standalone: false,
  templateUrl: './featured-cars.component.html',
  styleUrl: './featured-cars.component.scss'
})
export class FeaturedCarsComponent implements OnInit{
  vehicles:any

  constructor(private _VehicleService:VehicleService){}

  ngOnInit(): void {
    this.getAllVehicles()
  }

  getAllVehicles(){
    this._VehicleService.getAllVehicles().subscribe({
      next:(res)=>{
        console.log('slice',res);
        this.vehicles = res.slice(0,5)
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }



    // Configuration options for the Owl Carousel
    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        600: {
          items: 3
        },
        1000: {
          items: 5
        }
      },
      nav: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true
    }
}
