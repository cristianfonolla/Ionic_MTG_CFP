import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { MessagingService } from '../services/messaging.service';
import { environment } from '../../environments/environment';
import { TechnologySearchService } from '../technology-search.service';
import {SearchResultService} from "../services/searchResult/search-result.service";

@Component({
  selector: 'app-technology-search',
  templateUrl: './technology-search.component.html',
  styleUrls: ['./technology-search.component.css']
})
export class TechnologySearchComponent implements OnInit {

  activeComponent = 'app-technology-search';
  technologies: any;
  gridItemClass = 'grid-item';
  stagedTechs: Map<number, boolean> = new Map<number, boolean>();


  constructor(private technologyService: TechnologySearchService, private categoryService: CategoryService, private messagingService: MessagingService, private searchResultService: SearchResultService) { }

  /**
  * Se subscribe a los eventos de los diferentes servicios
  * Se realiza la carga de las categorías 'Por Tecnología'
  */
  ngOnInit() {
    this.categoryService.componentChanged.subscribe((activeComponent: string) => {
      this.activeComponent = activeComponent;
    });

    this.categoryService.loadTechnologiesForSearch()
      .subscribe((technologies: any) => {
        this.technologies = technologies;
      });
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
    const selected = this.stagedTechs.get(id);
    if (selected === undefined || selected === false) {
      this.stagedTechs.set(id, true);
      this.gridItemClass = 'grid-item-selected';
    } else {
      this.stagedTechs.set(id, false);
      this.gridItemClass = 'grid-item';
    }
  }

  /**
  * Comprueba si la categoría está marcada
  * @param {id} - Identificador de la categoría
  */
  isChecked(id: number) {
    const tech = this.stagedTechs.get(id);
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
    const selectedTechs = [];
    this.stagedTechs
      .forEach((value: boolean, key: number) => {
        if (value) {
          selectedTechs.push(key);
        }
      });

    if (selectedTechs.length > 0) {
      // this.messagingService.show(environment.helpMsg.actionSuccessful);
        this.technologyService.searchCriteria(selectedTechs);
      this.stagedTechs.clear();
    } else {
      this.messagingService.show(environment.helpMsg.noSelectedReqDetails);
    }
  }
}
