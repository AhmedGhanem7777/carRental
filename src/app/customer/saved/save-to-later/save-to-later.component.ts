import { Component } from '@angular/core';
import { SavedService } from '../../../core/services/customer/saved/saved.service';
import { ToastrService } from 'ngx-toastr';
import { IsLoadingService } from '../../../core/services/common/is-loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-to-later',
  standalone: false,
  templateUrl: './save-to-later.component.html',
  styleUrl: './save-to-later.component.scss'
})
export class SaveToLaterComponent {
  cartDetails: any = {
    data: [],
    count: 0
  };

  currentUserId: any
  isLoading: boolean = true;

  constructor(private _SavedService: SavedService,private _Router: Router, private _ToastrService: ToastrService, public _IsLoadingService: IsLoadingService) { }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId')

    if (this.currentUserId) {
      this.getLoggedUserData();
    }
  }

  getLoggedUserData(): void {
    this._SavedService.getLoggedUserData(this.currentUserId).subscribe({
      next: (response: any) => {
        console.log('response', response);

        this.cartDetails = response;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }


  updateItemCount(productId: string, quantity: number): void {
    if (quantity === 0) {
      const toast = this._ToastrService.info('Deleting your vehicle...', '', { disableTimeOut: true });
      this.removeItem(this.currentUserId,productId);
      this._ToastrService.clear(toast.toastId);
      this._ToastrService.success('Vehicle Removed successfully')
    } else {
      const toast = this._ToastrService.info('Waitng...', '', { disableTimeOut: true });
      this._SavedService.updateVehicle(this.currentUserId,productId, quantity).subscribe({
        next: (response: any) => {
          console.log('update cart',response);
          this.getLoggedUserData()
          this.cartDetails = response.data; 
          this._ToastrService.clear(toast.toastId);
          this._ToastrService.success(`You have ${quantity} quantity now`)
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }


  removeItem(userId: any, vehicleId: any): void {
    this._SavedService.removeVehicle(userId, vehicleId).subscribe({
      next: (response: any) => {
        console.log('remove', response);
        this.getLoggedUserData()
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



  onClearCart() {
    if (!this.cartDetails.data || this.cartDetails.data.length === 0) 
      return;

    for (const vehicle of this.cartDetails.data) {
      this._SavedService.removeVehicle(this.currentUserId,vehicle.vehicleId).subscribe({
        next: (res) => {
          this._ToastrService.success('All vehicles have been removed from your cart.')
        },
        error: (err) => {
        }
      });
    }

    this._Router.navigate(['/customer/vehicles'])
    this.getLoggedUserData()
  }

}
