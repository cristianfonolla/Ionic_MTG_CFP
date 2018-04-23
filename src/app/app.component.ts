import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../environments/environment';

import { Category } from './category';

import * as svcs from './services/';
import { CategoryService } from './category.service';
import { Token } from 'app/token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  authSubscription: Subscription;
  authTokenSubscription: Subscription;
  isSolutionsMode = false;
  isActionLinesMode = false;
  username: string;
  activeComponent: string;
  token: Token;

  constructor(private authService: svcs.AuthService,
    private categoryService: CategoryService) { }

  /**
 * Se autentica el usuario. En caso d'autenticación correcta, se carga el listado de categorías
 */
  ngOnInit() {

      console.log(this.isAuthenticated());

      this.categoryService.componentChanged.subscribe(next => {
          this.activeComponent = next;
      })
    this.authSubscription = this.authService.authChanged
      .subscribe((authName: string) => {
        if (authName != null) {
          this.username = authName;
        }
      });

    this.authTokenSubscription = this.authService.token.subscribe((event: any) => {
      if (this.isAuthenticated()) {
        this.isActionLinesMode = true;
      } else {
        this.isActionLinesMode = false;
      }
    });
  }

  /**
 * Comprueba que existe tokenObject
 * @return {boolean} - Indica si el usuario está autenticado
 */
  isAuthenticated(): boolean {
    return this.authService.isUserAuthenticated();
  }

  /**
 * Vuelve del SolutionsModeComponent y se muestra el AppComponent en modo "actionLines"
 */
  setActionLinesMode() {
    this.isSolutionsMode = false;
  }

  /**
 * Se muestra el SolutionsModeComponent
 * Se eliminan todos los RequestDetail temporales
 * Se vacía el TextBox del RequestInnovationComponent
 */
  setSolutionsMode() {
    this.categoryService.componentChanged.next('app-solutions-mode');
    this.isSolutionsMode = true;
    this.categoryService.clearStagedCategories();
    this.categoryService.setReqInnovationText('');
  }

  /**
 * Acción de logout. Se devuelve al usuario al LoginComponent
 */
  logout() {
    this.authService.logout();
    this.isActionLinesMode = false;
  }

}
