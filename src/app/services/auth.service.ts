import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {Token} from '../token';

@Injectable()
export class AuthService {

    authChanged = new Subject<string>();
    token = new Subject<Token>();
    tokenObject: Token;
    username: string;

    constructor(private http: HttpClient) {
        this.loadToken();
    }

    getUserName() {
        return this.username;
    }

    setUserName(us: string) {
        this.username = us;
    }

    /**
     * Devuelve una cadena string con el token preparado para enviarlo a traves del header(HttpHeaders)
     * @return {string} - Token
     */
    getAuthHeader(): string {
        return this.tokenObject.token_type + ' ' + this.tokenObject.access_token;
    }

    /**
     * Comprueba que existe tokenObject
     * @return {boolean} - Indica si existe el tokenObject (no vacío)
     */
    isUserAuthenticated(): boolean {
        return this.tokenObject != null;
    }

    /**
     * Carga el token guardado siempre que se tenga permisos para acceder al localStorage
     * TODO: Implementación que tenga en cuenta el tiempo de expiración del Token
     */
    loadToken() {
        if (window.localStorage) {
            const token = localStorage.getItem("tokenObject");
            if (token != null) {
                this.tokenObject = JSON.parse(token);
                this.token.next(this.tokenObject);
            }
        }
    }

    /**
     * Envia petición de login, guarda en memória el token recibido y notifica el resultado
     * @param  {username} - Nombre de usuario
     * @return  {username} - Nombre de usuario
     * @return {Observable<any>} - Resultado
     */
    login(domain: string, username: string, password: string): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        const options = {
            headers,
            withCredentials: true
        };

        return this.http.post(environment.auth.endpoint + environment.auth.loginUser,
            'grant_type=password&password=' + password + '&username=' + domain + "\\" + username,
            options)
            .map((data: Token) => {
                const token = new Token(data.access_token, data.token_type, data.expires_in);
                this.tokenObject = token;
                this.saveTokenToStorage();
                this.authChanged.next(username);
                this.token.next(token);
                return token;
            })
            .catch((error: any) => Observable.throw(error || environment.errorMsg.serverConnection));
    }

    /**
     * Vacía el tokenObject y manda el aviso al AppComponent a través de la Subject
     * @return {string} - Token
     */
    logout() {
        this.tokenObject = null;
        this.removeTokenFromStorage();
        this.token.next();
    }

    /**
     * Elimina el token guardado siempre que se tenga permisos para acceder al localStorage
     */
    removeTokenFromStorage() {
        if (window.localStorage) {
            localStorage.removeItem("tokenObject");
        }
    }

    /**
     * Guarda el token siempre que se tenga permisos para acceder al localStorage
     */
    saveTokenToStorage() {
        if (window.localStorage && this.tokenObject != null) {
            localStorage.setItem("tokenObject", JSON.stringify(this.tokenObject));
        }
    }
}
