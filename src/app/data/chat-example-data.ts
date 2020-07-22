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

const initialMessages: Array<Message> = []