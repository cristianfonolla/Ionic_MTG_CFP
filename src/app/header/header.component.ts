import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @Input() header: string;
    @Input() username: string;
    @Input() rigthIcon: string;
    @Output() goBack: EventEmitter<any> = new EventEmitter();
    @Output() refreshButton: EventEmitter<any> = new EventEmitter();
    @Output() searchButton: EventEmitter<any> = new EventEmitter();
    @Output() sendButton: EventEmitter<any> = new EventEmitter();
    @Output() alarmButton: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    /**
     * Se emite un evento al pulsar el botón de 'Volver hacia atrás'
     */
    onGoBack() {
        this.goBack.emit(null);
    }


    /**
     * Se emite un evento al pulsar al boton de 'alarma'
     */
    onAlarm() {
        this.alarmButton.emit(null);
    }

    /**
     * Se emite un evento al pulsar el botón de 'Refresh'
     */
    onRefresh() {
        this.refreshButton.emit(null);
    }

    /**
     * Se emite un evento al pulsar el botón de 'Búsqueda'
     */
    onSearch() {
        this.searchButton.emit(null);
    }

    /**
     * Se emite un evento al pulsar el botón de 'Enviar'
     */
    onSendRequestInnovation() {
        this.sendButton.emit(null);
    }

}
