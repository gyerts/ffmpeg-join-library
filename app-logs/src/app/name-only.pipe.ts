import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameOnly',
  standalone: true
})
export class NameOnlyPipe implements PipeTransform {

  transform(path?: string): string {
    return path?.split('/').pop()!;
  }
}
