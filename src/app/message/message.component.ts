import { Component, OnInit } from '@angular/core';
import { MessageService, MessageType } from '../message.service'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(public msg: MessageService) { }

  ngOnInit() {
    // this.msg.send("OK!", MessageType.Success)
  }

}
