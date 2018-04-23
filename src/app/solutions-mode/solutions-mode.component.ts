import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Category } from '../category';
import { CategoryService } from '../category.service';
import { MessagingService } from '../services/messaging.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-solutions-mode',
  templateUrl: './solutions-mode.component.html',
  styleUrls: ['./solutions-mode.component.css']
})
export class SolutionsModeComponent implements OnInit {

  activeComponent: string;
  categoriesLoaded = false;
  isRequestInnovationMode = false;
  isCategoryMode = false;
  loadingError = false;

  @Output() goBack: EventEmitter<any> = new EventEmitter();

  constructor(private categoryService: CategoryService, private messagingService: MessagingService) { }

  /**
  * Se realiza llamada para pre-cargar el árbol de categorías del CategoriesComponent
  * Se subscribe a los eventos de los diferentes servicios
  */
  ngOnInit() {
    this.activeComponent = 'app-solutions-mode';
    this.loadCategories();

      this.categoryService.componentChanged.subscribe((activeComponent: string) => {
      this.activeComponent = activeComponent;
    });

  }

  /**
  * Muestra en pantalla el AppComponent
  */
  goBackToActionLines() {
    this.goBack.emit(null);
    this.categoriesLoaded = true;
  }

  /**
  * Llamada para pre-cargar el árbol de categorías del CategoriesComponent
  * Durante el proceso de carga se muestra un spinner con el mensaje "CARGANDO"
  * En caso de error en la connexión con el servidor:
  *   1) Se muestra un mensaje informativo
  *   2) Se volverá a ejecutar este método cuando el usuario lo solicite
  */
  loadCategories() {
    this.categoriesLoaded = false;
    this.categoryService.loadCategories().subscribe((categories: any) => {
      if (categories.length > 0) {
        this.categoriesLoaded = true;
        this.loadingError = false;
      }
    },
      error => {
        this.messagingService.show(environment.errorMsg.serverConnection, environment.MsgType.error);
        this.categoriesLoaded = true;
        this.loadingError = true;
      });
  }

  /**
  * Muestra en pantalla el CategoriesComponent
  */
  setCategoryMode() {
    if (this.loadingError) {
      this.loadCategories();
    } else {
      this.categoryService.componentChanged.next('app-categories');
      this.categoriesLoaded = true;
    }
  }

  /**
  * Muestra en pantalla el TechnologySearchComponent
  */
  setTechnologySearchMode() {
    this.categoryService.componentChanged.next('app-technology-search');
    this.categoriesLoaded = true;
  }

  /**
  * Muestra en pantalla el SectorSearchComponent
  */
  setSectorSearchMode(){
    this.categoryService.componentChanged.next('app-sector-search');
    this.categoriesLoaded = true;
  }


  /**
  * Muestra en pantalla el RequestInnovationComponent
  */
  setRequestInnovationMode() {
    this.categoryService.componentChanged.next('app-request-innovation');
  }

  /**
  * Muestra en pantalla el SolutionsModeComponent
  */
  setSolutionsMode(): void {
    this.categoryService.componentChanged.next('app-solutions-mode');
  }

}
