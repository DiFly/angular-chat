import { UserService } from './../../service/user.service';
import { ThreadsService } from './../../service/threads.service';
import { MessagesService } from './../../service/messages.service';
import { User } from './../../model/user';
import { Message } from './../../model/message';
import { Thread } from './../../model/thread';
import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit {
  messages: Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User;

  constructor(
    public messagesService: MessagesService,
    public threadsService: ThreadsService,
    public usersService: UserService,
    public el: ElementRef
  ) { }

  ngOnInit(): void {
    this.messages = this.threadsService.currentThreadMessages;
    this.draftMessage = new Message;
  }

}
