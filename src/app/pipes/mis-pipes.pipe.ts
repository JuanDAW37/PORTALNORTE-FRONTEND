import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'misPipes'
})
export class MisPipesPipe implements PipeTransform {

  transform(valor: number): string {
    return valor + 'horas';
  }
}
