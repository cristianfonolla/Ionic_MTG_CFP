import { Injectable, Injector } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'app/services';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    authService: AuthService;

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).catch(e => this.handleAuthError(e));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
      // console.log(err);
      // handle your auth error or rethrow
      if (err.status === 401 || err.status === 403) {
          if (this.authService == null) {
              this.authService = this.injector.get(AuthService);
          }
          // navigate /delete cookies or whatever
        this.authService.logout();
        // if you've caught / handled the error, you don't want to rethrow it unless you
        // also want downstream consumers to have to handle it as well.
        return Observable.of(err.message);
      }
      return Observable.throw(err);
    }
}

