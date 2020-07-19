import { User } from './../model/user';
import { Message } from './../model/message';
import { Subject, Observable, from } from 'rxjs';
import { filter, scan, publishReplay, refCount, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Thread } from '../model/thread';

const initialMessages: Message[] = [];

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  newMessages: Subject<Message> = new Subject<Message>();
  messages: Observable<Message[]>;
  updates: Subject<any> = new Subject<any>();
  create: Subject<Message> = new Subject<Message>();
  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {
    this.messages = this.updates.pipe(
      scan((
        messages: Message[],
        operation: IMessagesOperation) => {
        return operation(messages);
        },
        initialMessages
      ),
      publishReplay(1),
      refCount()
    );

    this.create.pipe(
      map( function(message: Message): IMessagesOperation {
        return (messages: Message[]) => {
          return messages.concat(message);
        };
      })
    ).subscribe(this.updates);

    this.newMessages.subscribe(this.create);

    this.markThreadAsRead.pipe(
      map((thread: Thread) => {
        return (messages: Message[]) => {
          return messages.map( (message: Message) => {
            if(message.thread.id === thread.id) {
              message.isRead = true;
            }
            return message;
          })
        }
      })
    ).subscribe(this.updates);
  }

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

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

export const messagesServiceInjectables: Array<any> = [
  MessagesService
];
