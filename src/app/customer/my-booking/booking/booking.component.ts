import { Component } from '@angular/core';

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  isLoading = false
  bookingData = {
    name: '',
    phone: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: ''
  };

  bookingSuccess = false;
  referenceNumber = '';

  onSubmit() {
    this.isLoading = true;
    this.bookingSuccess = false;

    this.referenceNumber = 'BK' + Math.random().toString(36).substr(2, 8).toUpperCase();

    setTimeout(() => {
      this.isLoading = false;

      setTimeout(() => {
        this.bookingSuccess = true;
      }, 500);

      console.log('Booking submitted:', {
        ...this.bookingData,
        referenceNumber: this.referenceNumber
      });
    }, 4000);
  }

}
