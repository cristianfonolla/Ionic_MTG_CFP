import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { MessagingService } from '../services/messaging.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-request-innovation',
  templateUrl: './request-innovation.component.html',
  styleUrls: ['./request-innovation.component.css']
})
export class RequestInnovationComponent implements OnInit, OnDestroy {

  @Output() goBack: EventEmitter<any> = new EventEmitter();

  activeComponent: string;
  form: FormGroup;

  constructor(private categoryService: CategoryService, private messagingService: MessagingService) { }

  ngOnInit() {
    this.activeComponent = 'app-request-innovation';
    this.categoryService.componentChanged.subscribe((activeComponent: string) => {
      this.activeComponent = activeComponent;
    });
    this.initForm();
  }

  ngOnDestroy() {
    this.categoryService.setReqInnovationText(this.form.value.detail);
  }

  /**
  * Llamada al CategoryService para enviar la consulta específica dirigida al Departamento de Innovación
  * Previamente se comprueba que el campo no esté vacío
  * Se muestra un mensaje con el resultado de la acción
  */
  sendRequestInnovation() {
    if (this.form.value.detail) {
      this.categoryService.sendInnovationRequest(this.form.value.detail)
        .subscribe(result => {
            console.log(result);
          const jsonstr = JSON.stringify(result);
          const arr = jsonstr.split(':');
          const msg = arr[0].replace('{', '').replace('\"', '').replace('\"', '');
          this.messagingService.show(msg);
          this.form.reset();
          this.categoryService.clearStagedCategories();
        },
        error => {
          this.messagingService.show(environment.errorMsg.unexpectedError);
        });
    } else {
      this.messagingService.show(environment.errorMsg.textNotIntroducedReqInnovation);
    }
  }

  /**
  * Vuelve al SolutionsModeComponent
  */
  goBackToSolutionsMode() {
    this.categoryService.componentChanged.next('app-solutions-mode');
  }

  /**
 * Inicializa el formulario
 */
  private initForm() {
    this.form = new FormGroup({
      'detail': new FormControl(this.categoryService.getReqInnovationText())
    });
  }

}
