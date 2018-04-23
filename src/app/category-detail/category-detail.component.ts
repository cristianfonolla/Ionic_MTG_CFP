import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { MessagingService } from '../services/messaging.service';
import { Category } from '../category';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit, OnDestroy {

  @Input() category: Category;
  @Input() username: string;

  catHeaderName: string;
  form: FormGroup;

  constructor(private categoryService: CategoryService, private messagingService: MessagingService) { }

  /**
  * Se subscribe a los eventos de los diferentes servicios
  * Inicia el formulario
  */
  ngOnInit() {
    this.categoryService.activeCategoryChanged.subscribe((category: Category) => {
      this.category = category;
      this.catHeaderName = this.category ? this.category.title : '';
    });
    this.initForm();
    }

    /**
    * Resetea el formulario al salir del componente
    */
  ngOnDestroy() {
    this.form.reset();
  }

  /**
  * Devuelve ReqDetail actual de la lista de categorias seleccionadas
  * @return  {any} - Resultado
  */
  getReqDetail(): any {
    return this.categoryService.getStagedCategories().get(this.category.id);
  }

  /**
  * Devuelve el ReqDetailText
  * @return  {string} - Texto
  */
  getUserExplanation(): string {
    const reqDetail = this.getReqDetail();
    let result = '';

    if (reqDetail) {
      result = reqDetail.text;
    }

    return result;
  }

  /**
  * Vuelve al CategoryComponent
  */
  goBack(): void {
    this.updateReqDetail(this.isChecked(), this.form.value.detail);
    this.categoryService.goBackFromCategoryDetail();
  }

  /**
  * Comprueba que la categoría esta seleccionada
  * @return  {boolean} - Resultado
  */
  isChecked(): boolean {
    return this.categoryService.isStagedCatSelected(this.category.id);
  }

  /**
  * Comprueba que la categoría existe en la lista de selección
  * Si la categoría ha sido seleccionada y psoteriormente desseleccionada devuelve true (sigue en el Map)
  * @return  {boolean} - Resultado
  */
  isStoredInMap(): boolean {
    return this.categoryService.getStagedCategories().has(this.category.id);
  }

  /**
  * Se llama al CategoryService para la consulta de las categorías seleccionadas
  * Si no hay ninguna categoría seleccionada (con o sin texto), no accepta la búsqueda y muestra un mensaje informativo
  */
  searchCriteriaDetail(): void {
    this.updateReqDetail(this.isChecked(), this.form.value.detail);
    if (this.categoryService.getCountStagedCatSelected() > 0) {
      this.categoryService.searchCriteria();
    } else {
      this.messagingService.show(environment.helpMsg.noSelectedReqDetails);
    }
  }

  /**
  * Marca/desmarca la categoría de la lista de categorías seleccionadas
  */
  selectItem() {
    this.updateReqDetail(!this.isChecked(), this.form.value.detail);
  }

  /**
  * Cuando se hace focus en el formulario, se añade esta categoría a la lista de categorías seleccionadas
  */
  selectText() {
    if (!this.isChecked()) {
      this.updateReqDetail(!this.isChecked(), this.form.value.detail);
    }
  }

  /**
  * Añade o modifica esta categoría de la lista de categorías seleccionadas
  * @param  {selected} - Indica si está seleccionada
  * @param  {text} - ReqDetailText
  */
  updateReqDetail(selected: boolean, text: string) {
    this.categoryService.setStagedCategory(this.category.id, selected, text, this.category);
  }

  /**
  * Inicializa el formulario
  */
  private initForm() {
    this.form = new FormGroup({
      'detail': new FormControl(this.isStoredInMap() ? this.getUserExplanation() : '')
    });
  }

}
