import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BreadcrumbService } from '../services/breadcrumb.service';

class NavItem {

  id: number;
  title: string;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Output() navBack: EventEmitter<any> = new EventEmitter();
  items: NavItem[];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.items = [];
  }

  ngOnInit() {
    this.breadcrumbService.itemsChanged.subscribe((items: NavItem[]) => {
      if (items) {
        this.items = items;
      }
    });
  }

  /**
  * Al clicar encima de un categoría, se envía el identificador al CategoryComponent y éste realiza el recálculo de la visualización del árbol
  * EventEmitter "navBack" sólo se usa en CategoryDetailComponent para realizar el cambio de visualización CategoryComponent/CategoryDetailComponent
  * @param  {catId} - Identificador de la categoría
  */
  navigateToCategory(catId: number) {
    this.navBack.emit();
    this.breadcrumbService.navChanged.next(catId);
  }

}
