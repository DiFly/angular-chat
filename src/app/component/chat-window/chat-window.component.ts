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

    this.threadsService.currentThread.subscribe(
      (thread: Thread) => {
        this.currentThread = thread;
      }
    );

    this.usersService.currentUser.subscribe(
      (user: User) => {
        this.currentUser = user;
      }
    );
  }

  sendMessage(): void {
    const m: Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;
    this.messagesService.addMessage(m);
    this.draftMessage = new Message();
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  scrolButton(): void {
    const scrollPane: any = this.el.nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

}
