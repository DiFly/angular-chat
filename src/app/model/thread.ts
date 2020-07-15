import { v1 as uuidv1 } from 'uuid';
import { Message } from './message';

export class Thread {
  id: string;
  lastMessage: Message;
  name: string;
  avatarSrc: string;

  constructor(
    id?: string,
    name?: string,
    avatarSrc?: string
  ){
    this.id = id || uuidv1();
    this.name = name;
    this.avatarSrc = avatarSrc;
  }
}
