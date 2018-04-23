import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

class NavItem {

  id: number;
  title: string;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}

@Injectable()
export class BreadcrumbService {

  itemsChanged: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  navChanged: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  private items: NavItem[] = [];

  constructor() {
  }

  /**
  * Vacía todos los elementos
  * Al realizar el cambio se realiza un aviso a los subscribers
  */
  clear() {
    this.items = [];
    this.itemsChanged.next(this.items);
  }

  /**
  * Quita el último elemento
  * Al realizar el cambio se realiza un aviso a los subscribers
  */
  pop() {
    this.items.pop();
    this.itemsChanged.next(this.items);
  }

  /**
  * Añade un elemento
  * Al realizar el cambio se realiza un aviso a los subscribers
  * @param  {id} - Identificador de la categoría
  * @param  {title} - Título de la categoría
  */
  push(id: number, title: string) {
    this.items.push(new NavItem(id, title));
    this.itemsChanged.next(this.items);
  }

  /**
  * Devuelve el último elemento de la lista
  */
  getLastItem(){
    return this.items[this.items.length - 1];
  }

  /**
  * Devuelve una copia de la lista
  */
  getItems(){
    return this.items.slice();
  }

  /**
  * Devuelve la longitud de la lista
  */
  getLength(){
    return this.items.length;
  }

}
