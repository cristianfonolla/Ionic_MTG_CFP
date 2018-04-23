import { AfterViewChecked, Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMatchHeight]'
})
export class MatchHeightDirective implements AfterViewChecked {

  // Classname to match height
  @Input() className: string;

  constructor(private el: ElementRef) {
  }

  @HostListener('window:resize')
  onResize() {
    this.matchHeight(this.el.nativeElement, this.className);
  }

  ngAfterViewChecked(): void {
    this.matchHeight(this.el.nativeElement, this.className);
  }

  /**
  * Lógica de la Directive
  */
  matchHeight(parent: HTMLElement, className: string) {
    if (!parent) {
      return;
    }

    // Paso 1: Busca todos los elementos hijo que tengan la 'className'
    const children = parent.getElementsByClassName(className);

    if (!children) {
      return;
    }

    // Paso 2a: Obtiene todas las 'height' de los elementos hijo
    const itemHeights = Array.from(children)
      .map(x => x.getBoundingClientRect().height);

    // Paso 2b: Encuentra el elemento con mayor 'height'
    const maxHeight = itemHeights.reduce((prev, curr) => {
      return curr > prev ? curr : prev;
    }, 0);

    // Paso 3: Actualiza todos los elementos hijos al valor 'heigth' más grande
    Array.from(children)
      .forEach((x: HTMLElement) => {
        if (maxHeight > 100) {
          x.style.height = `${maxHeight}px`
        } else {
          x.style.height = `100px`
        }

      });
  }
}
