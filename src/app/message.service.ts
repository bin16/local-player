import { Injectable } from '@angular/core';

export enum MessageType {
  Success = 'success',
  Warning = 'warning',
  Alert = 'alert',
  Info = 'info',
  Log = 'log',
}

export type Message = {
  id: number,
  content: string,
  type: MessageType,
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = []
  send(content, type = MessageType.Info) {
    const id = performance.now()
    this.messages.push({
      id, content, type,
    })
  }

  clear() {
    this.messages = []
  }

  close(id: number) {
    this.messages.forEach((one, ix) => {
      if (one.id === id) {
        this.messages.splice(ix, 1)
      }
    })
  }
  constructor() { }
}
