import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';
import { Category } from './category';
import { IndustrialSectorDto } from './industrial-sector.dto';
import { UserRequestDto } from './user-request-dto';
import { FreeTextRequestDto } from './free-text-request-dto';

import { BreadcrumbService } from './services/breadcrumb.service';
import { MessagingService } from './services/messaging.service';
import { SearchResultService } from './services/searchResult/search-result.service';

@Injectable()
export class CategoryService {

  activeCategory: Category;
  activeCategoryChanged: BehaviorSubject<Category> = new BehaviorSubject<Category>(null);
  categories: any;
  categoriesChanged: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  componentChanged: BehaviorSubject<string> = new BehaviorSubject<string>('app-categories');
  incompleteReqDetailsChanged: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  originalCategories: any;
  reqInnovation: string;
  stagedCategories: Map<number, { selected: boolean, text: string, category: Category }> = new Map<number, { selected: boolean, text: string, category: Category }>();

  constructor(private http: HttpClient, private breadcrumbService: BreadcrumbService,private searchResultService: SearchResultService, private messagingService: MessagingService) { }

  /**
 * Vacía el mapa "stagedCategories" que contiene la lista de categorías marcadas
 */
  clearStagedCategories() {
    this.stagedCategories.clear();
  }

  /**
 * Cuenta las categorías detalle seleccionadas a partir de su categoría padre
 * @param  {cat} - Categoría
 * @return { number } - Número de categorías seleccionadas
 */
  countReqDetailsSelectedFromParent(cat: Category): number {
    let count = 0;

    if (cat === null) {
      return count;
    }

    if (this.isStagedCatSelected(cat.id)) {
      count = 1;
    }

    if (cat.childs.length > 0) {
      for (const categ of cat.childs) {
        count = count + this.countReqDetailsSelectedFromParent(categ);
      }
    }

    return count;
  }

  /**
* Recupera las subcategorias de la categoría pasada por parámetro.
* En caso que la categoría no tenga subcategorías, muestra la categoría detalle
* Establece el componente y las categorías que se deben mostrar
* @param  {category} - Categoría
* @param  {addTonavCategoryStack} - Define si debe añadir la categoría a la pila de navegación
*/
  getChildsOfCategory(category: Category, addTonavCategoryStack: boolean = true) {
    if (category != null) {
      if (category.childs.length === 0 && category.isDetail) {
        this.componentChanged.next('app-category-detail');
      } else {
        if (addTonavCategoryStack) {
          this.breadcrumbService.push(category.id, category.title);
        }
        this.categories = this.categories.find(c => c.id === category.id).childs;
        this.categoriesChanged.next(this.categories);
      }
    } else {
      this.categories = this.getOriginalCategories();
      this.categoriesChanged.next(this.categories);
    }
    this.categoriesChanged.next(this.categories);
    this.activeCategory = category;
    this.activeCategoryChanged.next(this.activeCategory);
  }

  /**
 * Cuenta las categorías de "tipo detalle" seleccionadas en el mapa "stagedCategories"
 * @return { number } - Número de categorías seleccionadas
 */
  getCountStagedCatSelected(): number {
    let count = 0;

    this.stagedCategories.forEach((value: { selected: boolean, text: string, category: Category }, key: number) => {
      if (value.selected && value.category.isDetail) {
        count = count + 1;
      }
    });

    return count;
  }

  /**
 * Devuelve las categorías de "tipo detalle" seleccionadas en el mapa "stagedCategories" con ReqDetailText vacío
 * @return { Category[] } - Lista de categorías seleccionadas con ReqDetailText vacío
 */
  getEmptyStagedCatSelected(): Category[] {
    const incompleteReqDetails = [];
    this.stagedCategories
      .forEach((value: { selected: boolean, text: string, category: Category }, key: number) => {
        if (value.selected && value.category.isDetail && !value.text) {
          incompleteReqDetails.push(value.category);
        }
      });
    return incompleteReqDetails;
  }

  /**
  * Devuelve las categorías previamente cargadas en el método "loadCategories"
  * @return {Category[]} - Lista de categorías
  */
  getOriginalCategories(): Category[] {
    return this.originalCategories.slice();
  }

  /**
 * Devuelve el texto de la consulta específica dirigida al Departamento de Innovación
 * @return {string} - Texto de la consulta
 */
  getReqInnovationText(): string {
    return this.reqInnovation;
  }

  /**
 * Convierte a JSON el objeto "stagedCategories" que contiene las categorías seleccionadas
 * @param  { Map<number, { selected: boolean, text: string, isDetail: boolean } } - Lista de categorías marcadas
 * @return {any} - Objeto JSON
 */
  getSearchCriteriaRequestJSON(stagedCategories: Map<number, { selected: boolean, text: string, category: Category }>): any {
    const criteria = new UserRequestDto();
    criteria.requestCriteria = [];
    criteria.userLanguage = 'es';

    stagedCategories.forEach((value: { selected: boolean, text: string, category: Category }, key: number) => {
      if (value.category.isDetail && value.selected) {
        criteria.requestCriteria.push({
          'criteriaId': key,
          'userExplanation': value.text,
        });
      }
    })

    return JSON.stringify(criteria);
  }

  /**
 * Devuelve la lista de elementos del mapa "stagedCategories"
 * @return { Map<number, { selected: boolean, text: string, isDetail: boolean }> } - Mapa
 */
  getStagedCategories(): Map<number, { selected: boolean; text: string; }> {
    return this.stagedCategories;
  }

  /**
 * Devuelve el título de la última categoría seleccionada (que exista en el BreadcrumbService)
 * @return {string} - Título de la última categoría seleccionada
 */
  getLastBreadcrumbItemText(): string {
    const item = this.breadcrumbService.getLastItem();
    return item ? item.title : 'SOLUTIONS';
  }

  /**
  * Se desplaza por el CategoryComponent o bien vuelve al SolutionsModeComponent
  * Establece el componente y las categorías que se deben mostrar
  */
  goBack(): void {
    if (this.breadcrumbService.getLength() === 1) {
      this.categories = this.getOriginalCategories()
      this.categoriesChanged.next(this.categories);
      this.componentChanged.next('app-solutions-mode');
    } else {
      this.breadcrumbService.pop();
      this.categories = this.getOriginalCategories();
      if (this.breadcrumbService.getLength() === 1) {
        this.initNavigation();
        this.categoriesChanged.next(this.categories);
      } else {
        const navItems = this.breadcrumbService.getItems();
        for (let navItem of navItems) {
          const cat = this.categories.find(c => c.id === navItem.id);
          if (cat) {
            this.getChildsOfCategory(this.categories.find(c => c.id === cat.id), false);
          } else {
            this.getChildsOfCategory(this.categories.find(c => c.id === -1), false);
          }
        }
      }
    }
  }

  /**
 * Vuelve al CategoryComponent desde CategoryDetailComponent
 * Establece el componente y las categorías que se deben mostrar
 */
  goBackFromCategoryDetail(): void {
    this.categoriesChanged.next(this.categories);
    this.componentChanged.next('app-categories');
  }

  /**
 * Vuelve al CategoryComponent desde IncompleteSearchComponent
 * Establece el componente y las categorías que se deben mostrar
 */
  goBackFromIncompleteSearch() {
    this.categories = this.getOriginalCategories()
    this.categoriesChanged.next(this.categories);
    this.componentChanged.next('app-categories');
    this.initNavigation();
  }

  /**
 * Establece el estado original para la navegación entre el árbol de categorías
 */
  initNavigation() {
    this.breadcrumbService.clear();
    this.breadcrumbService.push(-1, 'SOLUTIONS');
  }

  /**
  * Comprueba de forma recurrente si la categoría tiene alguna categoría detalle por debajo
  * @param  {cat} - Categoría
  * @return { boolean } - Resultado
  */
  isSelectionAllowed(cat: Category): boolean {
    let result = false;
    if (cat === null) {
      return false;
    }

    if (cat.isDetail) {
      return true;
    }

    if (cat.childs.length > 0) {
      for (const categ of cat.childs) {
        if (this.isSelectionAllowed(categ)) {
          result = true;
          break;
        }
      }
    }

    return result;
  }

  /**
 * Comprueba si la categoría detalle está seleccionada
 * @param  {catId} - Identificador de la categoría
 * @return { boolean } - Categoría marcada/no-marcada
 */
  isStagedCatSelected(catId: number): boolean {
    let result = false;
    const reqDetailObj = this.stagedCategories.get(catId);
    if (reqDetailObj) {
      result = reqDetailObj.selected && reqDetailObj.category.isDetail;
    }
    return result;
  }

  /**
 * Establece/reorganiza el árbol de categorías según el identificador de categoría parametrizado
 * @param  {catId} - Identificador categoría
 */
  navigateToCategory(catId: number) {
    const categ = this.originalCategories.find(c => c.id === catId);
    this.categories = this.getOriginalCategories();
    this.initNavigation();
    if (categ != null) {
      this.getChildsOfCategory(categ);
    } else {
      this.categoriesChanged.next(this.categories);
    }
  }

  /**
  * Recupera las categorías de "Solutions"
  * @return {Observable<Category[]>} - Observable que contiene la lista de categorías en formato JSON
  */
  loadCategories(): Observable<Category[]> {

    return this.http.get(environment.API.endpoint + environment.API.getCategories)
      .map((res: Response) => {
        this.categories = res;
        this.originalCategories = res;
        this.categoriesChanged.next(this.categories);
        return res
      })
      .catch((error: any) => Observable.throw(error || environment.errorMsg.serverConnection));
  }

  /**
  * Recupera las categorías de 'Por Tecnologia'
  * @return {Observable<any>} - Observable que contiene la lista de categorías en formato JSON
  */
  loadTechnologiesForSearch(): Observable<any> {
    return this.http.get(environment.API.endpoint + environment.API.getTechnologies)
      .map((res: Response) => {
        return res
      })
      .catch((error: any) => Observable.throw(error || environment.errorMsg.serverConnection));
  }

  /**
  * Recupera las categorías de 'Por Sector Industrial'
  * @return {Observable<any>} - Observable que contiene la lista de categorías en formato JSON
  */
  loadIndustrialSectorsForSearch(): Observable<any> {
    return this.http.get(environment.API.endpoint + environment.API.getIndustrialSectors)
      .map((res: Response) => {
        return res
      })
      .catch((error: any) => Observable.throw(error || environment.errorMsg.serverConnection));
  }

  /**
  * Envia la consulta de las categorías seleccionadas
  * @return {Observable<any>} - Observable que contiene resultado en formato JSON
  */
  saveSearchCriteriaRequest(): Observable<any> {

    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    const options = { headers: headers };

    return this.http.post(environment.API.endpoint + environment.API.getSolutions,
      this.getSearchCriteriaRequestJSON(this.stagedCategories),
      options)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || environment.errorMsg.serverConnection));
  }

  /**
  * Realiza la consulta de los criterios seleccionados
  * Si hay alguna RequestDetail sin texto se muestra el IncompleteSearchComponent
  * Si no hay ningún RequestDetail seleccionada se muestra un mensaje al usuario
  * Si todo está correcto se envía la consulta
  * Se muestra mensaje informativo según el resultado de la acción
  */
  searchCriteria() {
    if (this.getEmptyStagedCatSelected().length > 0) {
      this.componentChanged.next('app-incomplete-search-criteria');
      this.incompleteReqDetailsChanged.next(this.getEmptyStagedCatSelected());
      this.messagingService.show(environment.helpMsg.incompleteReqDetails);
    } else if (this.getCountStagedCatSelected() > 0) {
      this.saveSearchCriteriaRequest()
        .subscribe(result => {
          // const jsonstr = JSON.stringify(result);
          // const arr = jsonstr.split(':');
          // const msg = arr[0].replace('{', '').replace('\"', '').replace('\"', '');
          // this.messagingService.show(msg);
          this.clearStagedCategories();
          this.categories = this.getOriginalCategories();
          this.initNavigation();
          this.categoriesChanged.next(this.categories);
          this.searchResultService.searchResultChanged.next(result);
          this.componentChanged.next('app-search-result');
        },
        error => {
          this.messagingService.show(environment.errorMsg.unexpectedError);
        });
    } else {
      this.messagingService.show(environment.helpMsg.noSelectedReqDetails);
    }
  }



  /**
 * Envia una consulta específica dirigida al Departamento de Innovación
 * @return {Observable<any>} - Observable que contiene resultado en formato JSON
 */
  sendInnovationRequest(text: string): Observable<any> {

    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    const options = { headers: headers };

    const freeTextRequest = new FreeTextRequestDto();
    freeTextRequest.userLanguage = 'es';
    freeTextRequest.userFreeTextRequest = text;

    return this.http.post(environment.API.endpoint + environment.API.sendInformationRequest,
      freeTextRequest,
      options)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || environment.errorMsg.serverConnection));
  }

  /**
 * Actualiza el texto de la consulta específica dirigida al Departamento de Innovación
 * @param  {text} - Texto de la consulta
 */
  setReqInnovationText(text: string) {
    this.reqInnovation = text;
  }

  /**
 * Actualiza el mapa de categorías marcadas (añade/modifica elementos)
 * @param  {catId} - Identificador de la categoría
 * @param  {selected} - Indica si el elemento está seleccionado
 * @param  {text} - Texto de la Request Detail
 * @param  {isDetail} - Indica si la categoría es de tipo detalle
 */
  setStagedCategory(catId: number, selected: boolean, text: string, category: Category) {
    this.stagedCategories.set(catId, { selected, text, category });
  }

  /**
 * Marca la categoría "cat" y sus correspondientes hijas
 * @param  {cat} - Categoría
 */
  updateSelectionWithChilds(cat: Category) {
    let checked = true;

    if (cat === null) {
      return false;
    }

    const existsInMap = this.stagedCategories.has(cat.id);
    if (existsInMap && this.stagedCategories.get(cat.id).selected) {
      checked = false;
    }

    this.updateSelection(cat, checked);

    if (cat.childs.length > 0) {
      this.updateSelectionChilds(cat.childs, checked);
    }
  }

  /**
 * Marca las categorías hijas de forma recursiva
 * @param  {childs} - Lista de categorías
 * @param  {checked} - Indica si se debe marcar o no
 */
  private updateSelectionChilds(childs: Category[], checked: boolean) {
    for (const categ of childs) {
      this.updateSelection(categ, checked);
      if (categ.childs.length > 0) {
        this.updateSelectionChilds(categ.childs, checked);
      }
    }
  }

  /**
 * Marca/desmarca la categoría en el mapa "stagedCategories"
 * @param  {cat} - Categoría
 * @param  {checked} - Indica si se debe marcar o no
 */
  private updateSelection(cat: Category, checked: boolean) {
    if (cat === null) {
      return;
    }

    const existsInMap = this.stagedCategories.has(cat.id);
    if (existsInMap) {
      const catReqDetailText = this.stagedCategories.get(cat.id).text;
      this.setStagedCategory(cat.id, checked, catReqDetailText, cat);
    } else {
      this.setStagedCategory(cat.id, checked, '', cat);
    }
  }

}
