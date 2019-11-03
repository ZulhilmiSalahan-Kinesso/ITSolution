import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { MessageBundle } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messageList: Message[];

  constructor() { }
}
