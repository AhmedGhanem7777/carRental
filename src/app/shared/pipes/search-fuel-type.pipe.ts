import { Pipe, PipeTransform } from '@angular/core';
import { IFuelType } from '../../core/interfaces/admin/fuel.interface';

@Pipe({
  name: 'searchFuelType',
  standalone: false
})
export class SearchFuelTypePipe implements PipeTransform {

  transform(fuelTypes: IFuelType[], searchTerm: string): any[] {
    if (!fuelTypes || !searchTerm) return fuelTypes;
    return fuelTypes.filter(fuelType =>
      fuelType.fuelType.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
