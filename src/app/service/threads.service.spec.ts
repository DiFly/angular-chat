import { map } from 'rxjs/operators';
import { MessagesService } from './messages.service';
import { Message } from './../model/message';
import { Thread } from './../model/thread';
import { User } from './../model/user';
import { TestBed } from '@angular/core/testing';

import * as _ from 'lodash';

import { ThreadsService } from './threads.service';

describe('ThreadsService', () => {
  let service: ThreadsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreadsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shod collect the Threads from Messages', () => {
    const mickey: User = new User('Mickey Rourke', '');
    const frank: User = new User('Frank Coppolo', '');

    const t1: Thread = new Thread('t1', 'Thread 1', '');
    const t2: Thread = new Thread('t2', 'Thread 2', '');

    const m1: Message = new Message({
      author: mickey,
      text: 'Hi!',
      thead: t1
    });

    const m2: Message = new Message({
      author: frank,
      text: 'Where did you get that hat?',
      thead: t1
    });

    const m3: Message = new Message({
      author: mickey,
      text: 'Did you bring the briefcase?',
      thead: t2
    });

    const messagesService: MessagesService = new MessagesService();
    const threadsService: ThreadsService = new ThreadsService(messagesService);

    threadsService.threads.subscribe((threadIdx: { [key: string]: Thread }) => {
      const threads: Thread[] = _.values(threadIdx);
      const threadNames: string = _.map(threads, (t: Thread) => t.name);

      console.log(`=> threads (${threads.length}): ${threadNames} `);
    });

    messagesService.addMessage(m1);
    messagesService.addMessage(m2);
    messagesService.addMessage(m3);
  });
});
