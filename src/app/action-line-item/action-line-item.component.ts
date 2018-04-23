import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-action-line-item',
  templateUrl: './action-line-item.component.html',
  styleUrls: ['./action-line-item.component.css']
})
export class ActionLineItemComponent implements OnInit {
  @Input() title = '';
  @Input()img = '';

  constructor() { }

  ngOnInit() {
  }

}
