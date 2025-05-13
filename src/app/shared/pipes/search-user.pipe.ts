import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../../core/interfaces/admin/user.interface';

@Pipe({
  name: 'searchUser',
  standalone: false
})
export class SearchUserPipe implements PipeTransform {

  transform(users: IUser[], searchTerm: string): IUser[] {
    if (!users || !searchTerm) return users;

    return users.filter(user =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
