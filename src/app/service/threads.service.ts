import { Message } from './../model/message';
import { map } from 'rxjs/operators';
import { MessagesService } from './messages.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Thread } from '../model/thread';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {
  threads: Observable<{ [key: string]: Thread }>;
  orderedThreads: Observable<Thread[]>;
  currentThread: Subject<Thread> = new BehaviorSubject<Thread>(new Thread());

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

    this.orderedThreads = this.threads.pipe(
      map((threadGroups: { [key: string]: Thread }) => {
        const threads: Thread[] = _.values(threadGroups);
        return _.sortBy(threads, (t: Thread) => t.lastMessage.sentAt).reverse();
      })
    );
   }
}
