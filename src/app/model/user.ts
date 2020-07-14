import { v1 as uuidv1 } from 'uuid';

export class User {
  id: string;

  constructor(
    public name: string,
    public avatarSrc: string
  ){
    this.id = uuidv1();
  }
}
