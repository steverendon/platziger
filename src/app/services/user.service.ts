import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  friends:User[];
  constructor() { 
    let user1: User = {
      nick: "Steven",
      subnick: 'Hola',
      age: 28,
      email: 'dsrendon@gmail.com',
      friend: true,
      uid: 2
    };

    let user2: User = {
      nick: "Mario",
      subnick: 'mar234',
      age: 25,
      email: 'mario@gmail.com',
      friend: true,
      uid: 3
    };

    let user3: User = {
      nick: "Carlos",
      subnick: 'c34los',
      age: 30,
      email: 'carlos@gmail.com',
      friend: false,
      uid: 4
    };

    let user4: User = {
      nick: "Hector",
      subnick: 'hb45',
      age: 20,
      email: 'hector@gmail.com',
      friend: false,
      uid: 5
    };

    let user5: User = {
      nick: "Fabian",
      subnick: 'fabian1990',
      age: 12,
      email: 'fabian@gmail.com',
      friend: true,
      uid: 1
    };

    this.friends = [user1, user2, user3, user4, user5];
  }

  getFriends(){
    return this.friends;
  }
}
