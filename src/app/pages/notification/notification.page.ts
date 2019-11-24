import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Notification } from '../../models/notification';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  currentUser: string;
  filteredNotification: Notification[] = [];

  constructor(
    private navCtrl: NavController,
    private notificationService: NotificationService,
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.firebaseService.getNotificationsArray();
    this.currentUser = this.authService.userDetails().uid;
    this.notificationService.notificationList.forEach( notification => {
      if ( notification.UserId === this.currentUser) {
        this.filteredNotification.push(notification);
      }
    });
  }

  back() {
    this.navCtrl.pop();
  }

  markRead( notification: Notification ) {
    notification.Status = 'Read';
    this.firebaseService.updateNotification(notification.Id, notification);
  }

  deleteNotification( notification: Notification ) {
    this.firebaseService.removeNotification(notification.Id);
  }

  markUnread( notification: Notification ) {
    notification.Status = 'New';
    this.firebaseService.updateNotification(notification.Id, notification);
  }
}
