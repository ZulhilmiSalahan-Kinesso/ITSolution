import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;
  public userList: User[];

  constructor() { }
}
