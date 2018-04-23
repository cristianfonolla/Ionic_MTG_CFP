import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { MessagingService } from '../services/messaging.service';
import { environment } from '../../environments/environment';

import { IndustrialSectorDto } from '../industrial-sector.dto';

import { IndustrialSectorSearchService } from '../industrial-sector-search.service';

@Component({
  selector: 'app-sector-search',
  templateUrl: './sector-search.component.html',
  styleUrls: ['./sector-search.component.css']
})
export class SectorSearchComponent implements OnInit {

  activeComponent = 'app-sector-search';
  industrialSectors: IndustrialSectorDto[];
  groupsIndSectors: string[];
  gridItemClass = 'grid-item';
  stagedIndSectors: Map<number, boolean> = new Map<number, boolean>();

  constructor(private sectorIndustrialService: IndustrialSectorSearchService, private categoryService: CategoryService, private messagingService: MessagingService) { }

  /**
  * Se subscribe a los eventos de los diferentes servicios
  * Se realiza la carga de las categorías 'Por Sector Industrial'
  */
  ngOnInit() {
    this.categoryService.componentChanged.subscribe((activeComponent: string) => {
      this.activeComponent = activeComponent;
    });

    this.categoryService.loadIndustrialSectorsForSearch()
      .subscribe((industrialSectors: IndustrialSectorDto[]) => {
        // console.log(industrialSectors);
        this.industrialSectors = industrialSectors;
        if(this.industrialSectors.length > 0){
          this.groupsIndSectors = this.getGroupSectors();
        }
      });
  }

  /**
  * Se obtienen todos los sectores diferentes del objeto 'industrialSectors'
  * @return {any}: Resultado
  */
  getGroupSectors(): any{
    const groupSectors = []
    let groupItem = ''
      for (let cat of this.industrialSectors){
        if(groupItem != cat.groupName){
          groupSectors.push(cat.groupName);
          groupItem = cat.groupName;
        }
      }
      return groupSectors;
  }

  /**
  * Vuelve al SolutionsModeComponent
  */
  goBack() {
    this.categoryService.componentChanged.next('app-solutions-mode');
  }

  /**
  * Marca/desmarca la categoría
  * @param {id} - Identificador de la categoría
  */
  setSelected(id: number) {
    const selected = this.stagedIndSectors.get(id);
    if (selected === undefined || selected === false) {
      this.stagedIndSectors.set(id, true);
      this.gridItemClass = 'grid-item-selected';
    } else {
      this.stagedIndSectors.set(id, false);
      this.gridItemClass = 'grid-item';
    }
  }

  /**
  * Comprueba si la categoría está marcada
  * @param {id} - Identificador de la categoría
  */
  isChecked(id: number) {
    const tech = this.stagedIndSectors.get(id);
    if (tech) {
      return true;
    }
  }

  /**
  * Envia la consulta con las categorías seleccionadas
  * TODO: Implementar la lógica en CategoryService. Implicaciones:
  *   1) Realizar la pre-carga y almacenamiento de categorías de la misma manera que en CategoryComponent/CategoryService
  *   2) En CategoryService se deberan crear los métodos análogos a 'saveSearchCriteriaRequest' y 'getSearchCriteriaRequestJSON'
  * @param {id} - Identificador de la categoría
  */
  searchCriteria() {
    const selectedIndSectors = [];
    this.stagedIndSectors
      .forEach((value: boolean, key: number) => {
        if (value) {
          selectedIndSectors.push(key);
        }
      });

    if (selectedIndSectors.length > 0) {
      // this.messagingService.show(environment.helpMsg.actionSuccessful);
        this.sectorIndustrialService.searchCriteria(selectedIndSectors);
      this.stagedIndSectors.clear();
    } else {
      this.messagingService.show(environment.helpMsg.noSelectedReqDetails);
    }
  }

}
