import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyBookingRoutingModule } from './my-booking-routing.module';
import { BookingComponent } from './booking/booking.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BookingComponent
  ],
  imports: [
    CommonModule,
    MyBookingRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class MyBookingModule { }
