import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../core/interfaces/admin/user.interface';
import { UsersService } from '../../../core/services/admin/users/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  searchInput: string = '';
  users: IUser[] = [];
  selectedUser!: IUser;

  isLoading: boolean = false;
  showModal: boolean = false;

  constructor(private _UsersService: UsersService,private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getALlUsers();
  }

  getALlUsers() {
    this.isLoading = true;

    this._UsersService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  getSpecificUserDetails(userId: number) {
    this._UsersService.getCurrentUser(userId).subscribe({
      next: (res) => {
        this.selectedUser = res;

        this.showModal = true;
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  deleteUser(id:number){
    this._UsersService.deleteUser(id).subscribe({
      next:(res)=>{        
        this._ToastrService.success('The user has been deleted successfully.')
        this.getALlUsers()
      },error:(err)=>{
        this._ToastrService.error('Failed to delete the user. Please try again.')
        console.log(err);
        
      }
    })
  }

  closeModal() {
    this.showModal = false;
  }
}
