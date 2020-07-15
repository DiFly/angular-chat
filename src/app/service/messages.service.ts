import { User } from './../model/user';
import { Message } from './../model/message';
import { Subject, Observable, from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Thread } from '../model/thread';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  newMessages: Subject<Message> = new Subject<Message>();

  constructor() { }

  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  messagesForThreadUser(thread: Thread, user: User ): Observable<Message> {
    return this.newMessages.pipe(
        filter((message: Message) => {
          return (message.thread.id === thread.id) &&
            (message.author.id !== user.id);
        })
      )
  }
}
