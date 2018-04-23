import { Pipe, PipeTransform } from '@angular/core';
import { IndustrialSectorDto } from '../industrial-sector.dto';

@Pipe({
  name: 'sectorFilter'
})
export class SectorFilterPipe implements PipeTransform {

  /**
  * Devuelve los elementos del array que tienen el sectorName especificado por parámetro
  * @param {value} - Elemento predecesor a la Pipe (value | pipe)
  * @param {sectorName} - Nombre del sector
  * @return {any[]} - Array filtrado
  */
  transform(value: IndustrialSectorDto[], sectorName: string): any[] {
    if (value) {
      return value.filter(c => c.groupName == sectorName);
    } else {
      return value;
    }
  }
}
