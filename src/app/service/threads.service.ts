import { Message } from './../model/message';
import { map } from 'rxjs/operators';
import { MessagesService } from './messages.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Thread } from '../model/thread';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {
  threads: Observable<{ [key: string]: Thread }>;

  constructor(private messagesService: MessagesService) {
    this.threads = this.messagesService.messages.pipe(
      map( (messages: Message[]) => {
        const threads: {[key: string]: Thread} = {};

        messages.map((message: Message) => {
          threads[message.thread.id] = threads[message.thread.id] || message.thread;

          const messagesThread: Thread = threads[message.thread.id];
          if(!messagesThread.lastMessage || messagesThread.lastMessage.sentAt < message.sentAt) {
            messagesThread.lastMessage = message;
          }
        });

        return threads;
      })
    );
   }
}
