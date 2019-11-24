import { Injectable } from '@angular/core';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationList: Notification[];
  notificationCount: number;

  constructor() { }

  async getNotificationCountByUserId( userId ) {
    let notificationCount = 0;
    this.notificationList.forEach( notification => {
      if ( notification.UserId === userId ) {
        notificationCount++;
      }
    });
    return notificationCount;
  }
}
