import { UserService } from './../service/user.service';
import { ThreadsService } from './../service/threads.service';
import { MessagesService } from './../service/messages.service';
import * as moment from 'moment';

import { Message } from './../model/message';
import { Thread } from './../model/thread';
import { User } from './../model/user';

const me: User = new User('Mary', 'https://picsum.photos/143/143');
const ladycap: User = new User('Lady Star', 'https://picsum.photos/143/143');
const echo: User = new User('Echo Bot', 'https://picsum.photos/143/143');
const rev: User = new User('Reverse Bot', 'https://picsum.photos/143/143');
const wait: User = new User('Waiting Bot', 'https://picsum.photos/143/143');

const tLadycap: Thread = new Thread('tLadycap', ladycap.name, ladycap.avatarSrc);
const tEcho: Thread = new Thread('tEcho', echo.name, echo.avatarSrc);
const tRev: Thread = new Thread('tRev', rev.name, rev.avatarSrc);
const tWait: Thread = new Thread('tWait', wait.name, wait.avatarSrc);

const initialMessages: Array<Message> = [
  new Message({
    author: me,
    sentAt: moment().subtract(45, 'minutes').toDate(),
    text: 'You bite up because of your lower jaw.',
    thread: tLadycap,
  }),
  new Message({
    author: ladycap,
    sentAt: moment().subtract(20, 'minutes').toDate(),
    text:
      'Each person who knows you has a different perception of who you are.',
    thread: tLadycap,
  }),
  new Message({
    author: echo,
    sentAt: moment().subtract(1, 'minutes').toDate(),
    text:
      "She could hear him in the shower singing with a joy she hoped he'd retain after she delivered the news.",
    thread: tRev,
  }),
  new Message({
    author: wait,
    sentAt: moment().subtract(4, 'minutes').toDate(),
    text: 'She saw the brake lights, but not in time.',
    thread: tWait,
  }),
];

export class ChatExampleData {
    static init(
        messagesService: MessagesService,
        threadsService: ThreadsService,
        usersService: UserService
    ): void {
        messagesService.messages.subscribe(() => ({}));
        usersService.setCurrentUser(me);
        initialMessages.map((message: Message) =>
            messagesService.addMessage(message)
        );
        threadsService.setCurrentThread(tEcho);
        this.setupBots(messagesService);
    }

    static setupBots(
        messagesService: MessagesService
    ): void {

    };
}

