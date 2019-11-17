import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { MessageBundle } from '@angular/compiler';
import { Notification } from '../models/notification';
import { ToastService } from './toast.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messageList: Message[];

  constructor(
    private toastService: ToastService,
    private http: HttpClient) { }

  sendNotificationByToken(notification: Notification) {
    const title = notification.Title;
    const body = notification.Body;
    const token = notification.Token;

    const payload = '?token=' + token + '&title=' + title + '&body=' + body;

    this.http.get(environment.api.url + '/sendNotificationByToken' + payload, {}).subscribe(
      res => this.toastService.presentToast(res),
      err => this.toastService.presentToast(err)
    );
  }

  sendNotificationByUserId(notification: Notification) {
    const title = notification.Title;
    const body = notification.Body;
    const userId = notification.UserId;

    const payload = '?userId=' + userId + '&title=' + title + '&body=' + body;

    this.http.get(environment.api.url + '/sendNotificationByUserId' + payload, {}).subscribe(
      res => this.toastService.presentToast(res),
      err => this.toastService.presentToast(err)
    );
  }

}
