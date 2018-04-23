import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';

class MsgItem {

  show: boolean;
  message: string;
  type: string

  constructor(show: boolean, message: string, type: string) {
    this.show = show;
    this.message = message;
    this.type = type;
  }
}

@Injectable()
export class MessagingService {

  msgChanged: BehaviorSubject<MsgItem> = new BehaviorSubject<MsgItem>(null);
  constructor() { }

  /**
  * Muestra una ventana modal emergente con el texto dado por parámetro
  * @param  {message} - Mensaje que se muestra en el Modal
  * @param  {type} - Tipo de modal (info/warning/error)
  */
  show(message: string, type = environment.MsgType.info) {
    this.msgChanged.next(new MsgItem(true, message, type));
  }

  /**
  * Cierra la ventana modal para ocultar el mensaje
  */
  hide() {
    this.msgChanged.next(new MsgItem(false, '', 'I'));
  }

}
