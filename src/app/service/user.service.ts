import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: Subject<User> = new BehaviorSubject<User>(null);

  constructor() { }

  public setCurrentUser( newUser: User ): void {
    this.currentUser.next(newUser);
  }
}

export const userServiceInjectables: Array<any> = [
  UserService
];
