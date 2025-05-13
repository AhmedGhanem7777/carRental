import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../core/services/admin/setting/profile.service';
import { IUser } from '../../../core/interfaces/admin/user.interface';
import { IsLoadingService } from '../../../core/services/common/is-loading.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  userInfo: any = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    driverLicenseNumber: '',
    roleId: 1,
    isActive: false,
    imagePath: ''
  };
  
  isEditing: boolean = false;
  selectedFile: File | null = null;
  previewImage: string | null = null;

  constructor(private _ProfileService: ProfileService,public _IsLoadingService: IsLoadingService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this._IsLoadingService.setLoading(true)
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('No user ID found');
      return;
    }
    
    this._ProfileService.getCurrentUser(userId).subscribe({
      next: (res) => {
        this.userInfo = res;
      },
      error: (err) => {
        console.error('Error fetching user info:', err);
      },complete:()=>{
        this._IsLoadingService.setLoading(false)
      }
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.selectedFile = null;
      this.previewImage = null;
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        console.error('Please select an image file');
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        console.error('File size should not exceed 5MB');
        return;
      }

      this.selectedFile = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  updateUserProfile(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('No user ID found');
      return;
    }

    const userData = {
      firstName: this.userInfo.firstName,
      lastName: this.userInfo.lastName,
      email: this.userInfo.email,
      phoneNumber: this.userInfo.phoneNumber,
      driverLicenseNumber: this.userInfo.driverLicenseNumber,
      roleId: this.userInfo.roleId,
      isActive: this.userInfo.isActive
    };

    this._ProfileService.updateUserProfile(userId, userData).subscribe({
      next: (res) => {
        if (this.selectedFile) {
          this.uploadUserImage(userId, this.selectedFile);
        }
        this.userInfo = { ...this.userInfo, ...res };
        this.isEditing = false;
      },
      error: (err) => {
        console.error('Error updating profile:', err);
      }
    });
  }

  uploadUserImage(userId: any, imageFile: File): void {
    this._ProfileService.uploadUserImage(userId, imageFile).subscribe({
      next: (res) => {        
        this.userInfo.imagePath = (res as any).url;
        window.location.reload()
        this.selectedFile = null;
        this.previewImage = null;
      },
      error: (err) => {
        console.error('Error uploading image:', err);
      }
    });
  }

}
