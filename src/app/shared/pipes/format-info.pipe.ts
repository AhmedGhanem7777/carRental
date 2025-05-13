import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatInfo',
  standalone: false
})
export class FormatInfoPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const parts = value.split(',').map(part => part.trim());

    if (parts.length === 3) {
      const [make, model, year] = parts;
      return `${make} ${model} ${year}`;
    }

    return value;
  }

}
