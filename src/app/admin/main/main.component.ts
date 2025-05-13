import { Component } from '@angular/core';
import { UsersService } from '../../core/services/admin/users/users.service';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  userName:string=''
  profileImage:string=''
  email:string=''

  constructor(private _UsersService: UsersService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId')
    this.getCurrentUser(userId)
  }

  getCurrentUser(userId:any) {
    this._UsersService.getCurrentUser(userId).subscribe({
      next: (res) => {
        console.log('user data',res);
        this.userName = res.firstName
        this.email = res.email
        this.profileImage = res.imagePath
      }, error: (err) => {
        console.log(err);

      }
    })
  }
}
