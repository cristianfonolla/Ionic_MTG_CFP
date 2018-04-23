import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';

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

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {

  visible: boolean;
  message: string;
  type: string;
  constructor(private messagingService: MessagingService) { }

  /**
  * Se subscribe al evento del MessagingService para mostrar/cerrar el modal
  */
  ngOnInit() {
    this.messagingService.msgChanged.subscribe((msgItem: MsgItem) => {
      if (msgItem) {
        this.visible = msgItem.show;
        this.message = msgItem.message;
        this.type = msgItem.type;
      }
    });
  }

  /**
  * Cierra el modal
  */
  hide() {
    this.messagingService.hide();
  }

}
