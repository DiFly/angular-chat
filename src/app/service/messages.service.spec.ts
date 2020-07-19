import { Message } from './../model/message';
import { Thread } from './../model/thread';
import { User } from './../model/user';
import { TestBed } from '@angular/core/testing';

import { MessagesService } from './messages.service';

describe('MessagesService', () => {
  let service: MessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test', () => {
    const user: User = new User('Kate', '');
    const thread: Thread = new Thread('t1', 'Kate', '');
    const m1: Message = new Message({
      author: user,
      text: 'Hi!',
      thread: thread
    });

    const m2: Message = new Message({
      author: user,
      text: 'Bye!',
      thread: thread
    });

    const messageService: MessagesService = new MessagesService();

    messageService.newMessages.subscribe((message: Message) => {
      console.log('=> newMessage: ' + message.text);
    });

    messageService.messages.subscribe((messages: Message[]) => {
      console.log('=> messages: ' + messages.length);
    });

    messageService.addMessage(m1);
    messageService.addMessage(m2);
  });
});
