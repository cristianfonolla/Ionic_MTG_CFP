import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-incomplete-search-criteria',
  templateUrl: './incomplete-search-criteria.component.html',
  styleUrls: ['./incomplete-search-criteria.component.css']
})
export class IncompleteSearchCriteriaComponent implements OnInit, OnChanges {

  offset = 0;
  limit = 1;
  size = 1;
  range = 2;
  items: Category[];

  currentPage: number;
  currentItem: any;
  form: FormGroup;
  pages: Observable<number[]>;
  totalPages: number;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.incompleteReqDetailsChanged.subscribe((items: any[]) => {
      if (items) {
        this.items = items;
        this.size = items.length;
        this.offset = 0;
        this.getPages(this.offset, this.limit, this.size);
        this.initForm();
      }
    });
  }

  ngOnChanges() {
    this.getPages(this.offset, this.limit, this.size);
  }

  /**
 * Cancela la ejecución del evento enviado
 * @param  {event} - Evento
 */
  cancelEvent(event) {
    event.preventDefault();
  }

  /**
 * Emite un evento para mostrar el CategoriesComponent
 */
  goBackToCategories() {
    this.updateReqDetail(this.isCurrentItemChecked(), this.form.value.detail);
    this.categoryService.goBackFromIncompleteSearch();
  }

  /**
 * Comprueba que la categoría esta seleccionada
 * @return  {boolean} - Resultado
 */
  isCurrentItemChecked(): boolean {
    if (this.currentItem) {
      return this.categoryService.isStagedCatSelected(this.currentItem.id);
    } else {
      return false;
    }
  }

  /**
 * Añade o elimina esta categoría a la lista de categorías seleccionadas
 */
  selectItem() {
    this.updateReqDetail(!this.isCurrentItemChecked(), this.form.value.detail);
  }

  /**
 * Selecciona la página para mostrar
 * @param  {page} - Número de página
 * @param  {event} - Evento
 */
  selectPage(page: number, event) {
    this.cancelEvent(event);
    if (this.isValidPageNumber(page, this.totalPages)) {
      this.updateReqDetail(this.isCurrentItemChecked(), this.form.value.detail);

      this.offset = (page - 1) * this.limit;
      this.currentPage = this.offset + 1;
      this.currentItem = this.items[this.offset];
      this.getPages(this.offset, this.limit, this.size);

      this.initForm();
    }
  }

  /**
 * Emite un evento para realizar el envío de la consulta desde el CategoriesComponent
 * Previamente actualiza el resultado del texto del RequestDetail
 */
  searchCriteria() {
    this.updateReqDetail(this.isCurrentItemChecked(), this.form.value.detail);
    this.form.reset();
    this.offset = 0;
    this.currentItem = this.items[this.offset];
    this.categoryService.searchCriteria();
  }

  /**
 * Devuelve el número de página actual
 * @param  {offset} - Offset
  * @param  {limit} - Límite de elementos que se muestran a la ve
 * @return  {number} - Resultado
 */
  private getCurrentPage(offset: number, limit: number): number {
    return Math.floor(offset / limit) + 1;
  }

  /**
 * Calcula el número de páginas del páginador y realiza la configuración de visibilidad
 * @param  {offset} - Offset
 * @param  {limit} - Límite de elementos que se muestran a la vez
 * @param  {size} - Número de elementos total
 */
  private getPages(offset: number, limit: number, size: number) {
    this.currentPage = this.getCurrentPage(offset, limit);
    this.totalPages = this.getTotalPages(limit, size);
    this.pages = Observable.range(-this.range, this.range * 2 + 1)
      .map(offs => this.currentPage + offs)
      .filter(page => this.isValidPageNumber(page, this.totalPages))
      .toArray();
    this.currentItem = this.items[this.currentPage - 1];
  }

  /**
 * Devuelve el número de páginas
 * @param  {offset} - Offset
 * @param  {size} - Número de elementos total
 * @return  {number} - Resultado
 */
  private getTotalPages(limit: number, size: number): number {
    return Math.ceil(Math.max(size, 1) / Math.max(limit, 1));
  }

  /**
 * Recupera el texto del RequestDetail (currentItem)
 */
  private getUserExplanation() {
    const reqDetail = this.categoryService.getStagedCategories().get(this.currentItem.id);
    let result = '';

    if (reqDetail) {
      result = reqDetail.text;
    }

    return result;
  }

  /**
 * Inicializa el formulario
 */
  private initForm() {
    this.form = new FormGroup({
      'detail': new FormControl(this.getUserExplanation())
    });
  }

  /**
 * Comprueba si el número de página es válido
 * @param  {page} - Número de página
 * @param  {totalPages} - Número de elementos total
 * @return  {boolean} - Resultado
 */
  private isValidPageNumber(page: number, totalPages: number): boolean {
    return page > 0 && page <= totalPages;
  }

  /**
 * Añade o modifica el RequestDetail (currentItem) en la lista de categorías seleccionadas
 * @param  {text} - Categoría
 */
  private updateReqDetail (selected: boolean, text: string) {
    if (this.currentItem) {
      this.categoryService.setStagedCategory(this.currentItem.id, selected, text, this.currentItem);
    }
  }

}
