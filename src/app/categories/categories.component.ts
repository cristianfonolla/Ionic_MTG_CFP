import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '../../environments/environment';
import { CategoryService } from '../category.service';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { Category } from '../category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {

  @Output() goBackFromCategories: EventEmitter<any> = new EventEmitter();

  activeComponent = 'app-categories';
  category: Category;
  categories: Category[];
  catHeaderName: string;

  constructor(private categoryService: CategoryService, private breadcrumbService: BreadcrumbService) { }

  /**
  * Se subscribe a los eventos de los diferentes servicios
  */
  ngOnInit() {
    this.categoryService.categoriesChanged.subscribe((categories: any[]) => {
      if (categories) {
        this.categories = categories;
        this.catHeaderName = this.categoryService.getLastBreadcrumbItemText();
      }
    });
    this.breadcrumbService.navChanged.subscribe((goToCatId: number) => {
      this.categoryService.navigateToCategory(goToCatId);
    });
    this.categoryService.componentChanged.subscribe((activeComponent: string) => {
      this.activeComponent = activeComponent;
    });
  }

  /**
  * Selecciona/deselecciona las categorías hijas de una categoría padre
  * @param  {cat} - Categoría
  */
  checkCategoriesOf(cat: Category) {
    this.categoryService.updateSelectionWithChilds(cat);
  }

  /**
   * Comprueba que hay categorías seleccionadas en la categoría que se pasa por parámetro
   * @param  {cat} - Categoría
   */
  childsAreChecked(cat: Category): boolean {
    return this.countReqDetailsSelectedFromParent(cat) > 0;
  }

  /**
  * Cuenta el número de categorías "detalle" seleccionadas a partir de una categoría padre
  * @param  {category} - Categoría
  */
  countReqDetailsSelectedFromParent(cat: Category): number {
    return this.categoryService.countReqDetailsSelectedFromParent(cat);
  }

  /**
* Recupera las categorias de la categoría pasada por parámetro y las asigna a categories
* Muestra la categoría detalle en caso que la categoría no tenga subcategorías
* @param  {category} - Categoría
* @param  {addTonavCategoryStack} - Define si debe añadir la categoría a la pila de navegación
*/
  getChildsOfCategory(category: Category, addTonavCategoryStack: boolean = true) {
    this.categoryService.getChildsOfCategory(category, addTonavCategoryStack);
  }

  /**
  * Retrocede en la navegación del menú
  */
  goBack(): void {
    this.categoryService.goBack();
  }

  /**
  * Define si la categoría padre (y sus hijas) se puede seleccionar o no
  * @param  {cat} - Categoría
  * @return  {boolean} - Categoría
  */
  isSelectionAllowed(cat: Category): boolean {
    return this.categoryService.isSelectionAllowed(cat);
  }

  /**
 * Establece el árbol de categorías según el identificador de categoría parametrizado
 * @param  {catId} - Identificador categoría
 */
  navigateToCategory(catId: number) {
    this.categoryService.navigateToCategory(catId);
  }

  /**
  * Realiza la consulta de los criterios seleccionados
  * Si hay RequestDetail sin texto se muestra el IncompleteSearchComponent
  * Si no hay ningún RequestDetail seleccionado se muestra un mensaje al usuario
  * Si todo está correcto se envía la consulta
  */
  searchCriteria() {
    this.categoryService.searchCriteria();
  }

}
