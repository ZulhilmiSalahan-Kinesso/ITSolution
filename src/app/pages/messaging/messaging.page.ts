import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { Notification } from '../../models/notification';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.page.html',
  styleUrls: ['./messaging.page.scss'],
})
export class MessagingPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private messageService: MessageService,
    private userService: UserService,
    private firebaseService: FirebaseService
  ) {
    this.firebaseService.getMessagesArray();
  }

  ngOnInit() {
    this.messageService.messageList.forEach(element => {
      element.ReceiverName = this.userService.userList.find(x => x.Id === element.ReceiverId).Name;
      element.SenderName = this.userService.userList.find(x => x.Id === element.SenderId).Name;
    });
  }

  back() {
    this.navCtrl.pop();
  }

  sendNotification() {
    const notification: Notification = {
      Title: 'test',
      Body: 'test',
      // tslint:disable-next-line: max-line-length
      Token: 'cwtfzO8v9i4:APA91bEAywQlCN47ZA6KAN5u6kQit4_8Ig8u_UqvmxitGgB6cNTQV8uYUQgM0PoAzcMpgWDnL6bmQzUzgK7SSHazBdVRQLkplxApbQ4DpM3GxuRkbRS5zmDJpZNjmfwjnlSBcr1nSgdb'
    }

    this.messageService.sendNotificationByToken(notification);
  }
}
