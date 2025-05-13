import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../../core/interfaces/admin/category.interface';

@Pipe({
  name: 'searchCategory',
  standalone: false
})
export class SearchCategoryPipe implements PipeTransform {
    transform(categories: ICategory[], searchTerm: string): any[] {
      if (!categories || !searchTerm) return categories;
      return categories.filter(category =>
        category.name.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
}
