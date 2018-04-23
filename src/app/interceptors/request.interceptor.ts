import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'app/services';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  authService: AuthService;

  constructor(private injector: Injector) { }

  /**
  * Intercepta todas las peticiones dirigidas al servidor.
  * Comprueba que el usuario está identificado correctamente e introduce las credenciales en la cabecera 'Authorization'
  */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService == null) {
      this.authService = this.injector.get(AuthService);
    }
    if (this.authService.isUserAuthenticated()) {
      req = req.clone({
        headers: req.headers.append('Authorization', this.authService.getAuthHeader())
      });
    }
    return next.handle(req);
  }

}
