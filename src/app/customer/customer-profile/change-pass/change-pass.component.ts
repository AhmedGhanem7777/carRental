import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../../core/services/admin/setting/profile.service';
import { RegexPassword } from '../../../core/validations/regexPassword';

@Component({
  selector: 'app-change-pass',
  standalone: false,
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.scss'
})
export class ChangePassComponent implements OnInit {
  
  changePasswordForm!: FormGroup;
  isLoading = false;
  changeSuccess = false;
  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(private _ProfileService: ProfileService,private _FormBuilder: FormBuilder, private _Router: Router, private _ToastrService: ToastrService) { }

  ngOnInit(): void {

    this.changePasswordForm = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
    
  }


  passwordMatchValidator: ValidatorFn = (g: AbstractControl): { [key: string]: boolean } | null => {
    const newPassword = g.get('newPassword')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { mismatch: true };
  };


  onSubmit() {
    const currentEmail = localStorage.getItem('currentEmail')
    debugger
      this.isLoading = true;
      const { currentPassword, newPassword } = this.changePasswordForm.value;
  
      const requestBody = { email : currentEmail, currentPassword, newPassword };
  
      this._ProfileService.changePassword(requestBody).subscribe({
        next: (res) => {
          console.log('Password changed:', res);
          this.isLoading = false;
          this._ToastrService.success(res.message || 'Password changed successfully');
          this.changePasswordForm.reset();
          this._Router.navigate(['/customer']);
        },
        error: (err) => {
          this.isLoading = false;
          this._ToastrService.error(err.error?.message || 'Failed to change password');
        }
      });
  }
  


  togglePasswordVisibility(field: 'oldPassword' | 'newPassword' | 'confirmPassword') {
    switch (field) {
      case 'oldPassword':
        this.showOldPassword = !this.showOldPassword;
        break;
      case 'newPassword':
        this.showNewPassword = !this.showNewPassword;
        break;
      case 'confirmPassword':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }
}
