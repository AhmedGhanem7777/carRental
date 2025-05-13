import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../core/services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegexPassword } from '../../core/validations/regexPassword';
import { RegexPhoneNumber } from '../../core/validations/regexPhoneNumber';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-register',
  standalone: false,
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss'
})
export class LoginRegisterComponent {
  @ViewChild('signUpDiv') signUpDiv!: ElementRef;
  @ViewChild('containerOverflow') containerOverflow!: ElementRef;

  selectedFile: any
  imageUrl:any

  constructor(private _title: Title, private _AuthService: AuthService, private _Router: Router, private _ToastrService: ToastrService) { }

  registerForm = new FormGroup({
    roleId: new FormControl(2),
    role: new FormControl('User'),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(RegexPhoneNumber)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(RegexPassword)]),
    driverLicenseNumber: new FormControl('')
  });


  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.minLength(8), Validators.pattern(RegexPassword)])
  })


  login(userData: FormGroup) {
    this._AuthService.login(userData.value).subscribe({
      next: (res) => {
        console.log('Login', res);
        localStorage.setItem('userId', res.user.userId)
        localStorage.setItem('currentEmail', res.user.email)

        this._AuthService.setToken(res.token)

        if (res.user.email === "ahmedghanem@gmail.com" || res.user.role === "Admin") {
          localStorage.setItem('adminMail', res.user.email)
          this._Router.navigate(['/admin'])
        } else {
          this._Router.navigate(['/customer'])
        }
        this.clearInputs()
        this._ToastrService.success(`Login successful! Welcome back ${res.user.firstName} ${res.user.lastName}.`)
      }, error: (err) => {
        console.log(err);
        this._ToastrService.error('Wrong email or password. Try again.')
      }
    })
  }

  register(formGroup:FormGroup) {
    if (this.registerForm.valid) {
      const userData = formGroup.value;
      const formData = new FormData();
  
      Object.keys(userData).forEach(key => {
        if (key !== 'UserImage') {
          formData.append(key, userData[key]);
        }
      });
  
  
      if (this.selectedFile) {
        formData.append('UserImage', this.selectedFile);
      }

      this._AuthService.register(formData).subscribe({
        next: res => {
          this.clearInputs()
          this._ToastrService.success('Registration successful! You can now log in.')
        },
        error: err => {
          console.log(err);
          this._ToastrService.error('Registration failed. Please try again later.')
        }
      });
    }
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Create URL for image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }



  clearInputs() {
    this.registerForm.reset()
    this.loginForm.reset()
  }


  signInIsActive() {
    if (this.signUpDiv?.nativeElement && this.containerOverflow?.nativeElement) {
      this.signUpDiv.nativeElement.classList.remove('active');
      this.containerOverflow.nativeElement.classList.remove('overflow-visible');
      this.containerOverflow.nativeElement.classList.add('overflow-hidden');
    }
    this._title.setTitle('Login')
  }

  signUpIsActive() {
    if (this.signUpDiv?.nativeElement && this.containerOverflow?.nativeElement) {
      this.signUpDiv.nativeElement.classList.add('active');
      this.containerOverflow.nativeElement.classList.remove('overflow-hidden');
      this.containerOverflow.nativeElement.classList.add('overflow-visible');
    }
    this._title.setTitle('Register')
  }

}
