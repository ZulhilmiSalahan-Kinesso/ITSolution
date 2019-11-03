import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

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
}
