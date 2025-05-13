import { Pipe, PipeTransform } from '@angular/core';
import { IVehicle } from '../../core/interfaces/customer/vehicle.interface';

@Pipe({
  name: 'searchVehicle',
  standalone: false
})
export class SearchVehiclePipe implements PipeTransform {

  transform(vehicles: IVehicle[], searchTerm: string): any[] {
    if (!vehicles || !searchTerm) return vehicles;

    return vehicles.filter(vehicle =>
      vehicle.make.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.year.toString().includes(searchTerm.toString()) 
    );
  }

}
