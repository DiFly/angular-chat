import { UserService } from './../../service/user.service';
import { User } from './../../model/user';
import { Message } from './../../model/message';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  currentUser: User;
  incoming: boolean;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(
      (user: User) => {
        this.currentUser = user;
        if(this.message.author && user) {
          this.incoming = this.message.author.id !== user.id;
        }
      }
    );
  }

}
