import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Deal } from 'src/app/models/deal';
import { from } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Provider } from 'src/app/models/provider';
import { ToastService } from 'src/app/services/toast.service';
import { Notification } from '../../models/notification';
import { MessageService } from 'src/app/services/message.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.page.html',
  styleUrls: ['./create-deal.page.scss'],
})
export class CreateDealPage implements OnInit {

  private selectedProvider: Provider;

  private notification: Notification = new Notification();

  private deal: Deal = {
    Title: '',
    Description: '',
    StartDate: '',
    CompleteDate: '',
    Offer: 0,
    HirerId: '',
    FreelancerId: '',
    Status: 'New',
    DateCreated: new Date().toLocaleString()
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private messageService: MessageService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.route.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.selectedProvider = this.router.getCurrentNavigation().extras.state.Provider;
        this.deal.FreelancerId = this.selectedProvider.Id;
      }
    });

    // Get Hirer UserId
    this.deal.HirerId = this.authService.userDetails().uid;
  }

  ngOnInit() {

    this.userService.userList.forEach( user => {
      if ( user.Id === this.deal.FreelancerId ) {
        this.deal.FreelancerName = user.Name;
      }

      if ( user.Id === this.deal.HirerId ) {
        this.deal.HirerName = user.Name;
      }

    });
  }

  addDeal() {
    this.firebaseService.addDeal(this.deal)
      .then( res => this.toastService.presentToast('Add deal') )
      .catch( err => this.toastService.presentToast(err) );

    const notification: Notification = {
      Title: 'Your Receive New Deal',
      Body: 'Your receive new deal for project ' + this.deal.Title,
      UserId: this.deal.FreelancerId,
      Status: this.deal.Status
    }

    this.messageService.sendNotificationByUserId(notification);

    this.firebaseService.addNotification(notification)
      .then( res => this.toastService.presentToast('Add Notification') )
      .catch( err => this.toastService.presentToast(err) );

    this.toastService.presentToast('Successfully send deals');
    this.navCtrl.pop();
  }

  back() {
    this.navCtrl.pop();
  }
}
