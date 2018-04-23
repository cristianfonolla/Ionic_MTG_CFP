import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Token} from 'app/token';
import {environment} from '../../environments/environment';
import { loginInfo } from "../../environments/loginInfo";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    error: string;
    loading = false;
    signinForm: FormGroup;
    submitted = false;
    domain: string = "TSE";

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.initForm();
    }

    /**
     * Comprueba que el usuario se haya identificado
     * @return {boolean} - Resultado
     */
    isAuthenticated(): boolean {
        return this.authService.isUserAuthenticated();
    }

    /**
     * Envia petición de login. Se obtiene un token en caso de identificación correcta
     */
    onSubmit() {
        this.submitted = false;
        this.loading = true;
        this.authService.login(this.domain, this.signinForm.value.username, this.signinForm.value.password)
            .subscribe(
                r => {
                    loginInfo.username = this.signinForm.value.username;
                    this.submitted = true;
                    this.loading = false;
                },
                error => {
                    if (typeof error !== 'string') {
                        if (error.error.error === 'invalid_grant') {
                            this.error = environment.errorMsg.loginIncorrect;
                        } else {
                            this.error = environment.errorMsg.serverConnection;
                        }
                    } else if (error != null && error.length > 0) {
                        this.error = error;
                    } else {
                        this.error = environment.errorMsg.unexpectedError;
                    }

                    this.submitted = true;
                    this.loading = false;
                });

        this.signinForm.setValue({username: this.signinForm.value.username, password: ''});
    }

    /**
     * Inicializa el formulario
     */
    private initForm() {
        this.signinForm = new FormGroup({
            'username': new FormControl(null, [Validators.required]),
            'password': new FormControl(null, [Validators.required]),
        });
    }

}
