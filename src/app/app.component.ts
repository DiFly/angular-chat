import { ChatExampleData } from './data/chat-example-data';
import { UserService } from './service/user.service';
import { ThreadsService } from './service/threads.service';
import { MessagesService } from './service/messages.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public messagesService: MessagesService,
    public threadSerice: ThreadsService,
    public userService: UserService
    ){
    ChatExampleData.init(messagesService, threadSerice, userService);
  }
}
