import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { DealService } from 'src/app/services/deal.service';
import { Deal } from 'src/app/models/deal';
import { ToastService } from 'src/app/services/toast.service';
import { element } from 'protractor';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { Notification } from '../../models/notification';

@Component({
  selector: 'app-itservice-request',
  templateUrl: './itservice-request.page.html',
  styleUrls: ['./itservice-request.page.scss'],
})
export class ITServiceRequestPage implements OnInit {

  private filteredDeals: Deal[];

  constructor(
    private messageService: MessageService,
    private navCtrl: NavController,
    private firebaseService: FirebaseService,
    private dealService: DealService,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router
  ) {
    this.firebaseService.getDealsArray();
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.filteredDeals = [];
    this.dealService.dealList.forEach( element => {

      console.log('Deal To : ' + element.To);
      console.log('Current User : ' + this.authService.userDetails().uid);

      if ( element.To === this.authService.userDetails().uid ) {
        this.filteredDeals.push(element);
      }
    });
  }

  generateReceipt(deal: Deal) {
    const navigationExtras: NavigationExtras = {
      state: {
        Deal: deal
      }
    }

    this.router.navigate(['final-deal'], navigationExtras);
  }

  acceptDeal(deal: Deal) {
    deal.Status = 'Accepted';
    deal.ChangeDate = new Date().toLocaleString();
    this.firebaseService.updateDeal(deal.Id, deal);
    this.toastService.presentToast('Deal Accepted');

    const notification: Notification = {
      Title: 'Your Deal Is Acepted',
      Body: 'Your deal for project ' + deal.Title + ' is accpeted',
      UserId: deal.From
    }

    this.messageService.sendNotificationByUserId(notification);
  }

   rejectDeal(deal: Deal) {
      deal.Status = 'Rejected';
      deal.ChangeDate = new Date().toLocaleString();
      this.firebaseService.updateDeal(deal.Id, deal);
      this.toastService.presentToast('Deal Rejected');

      const notification: Notification = {
        Title: 'Your Deal Is Rejected',
        Body: 'Your deal for project ' + deal.Title + ' is rejected',
        UserId: deal.From
      }

      this.messageService.sendNotificationByUserId(notification);
   }

  back() {
    this.navCtrl.pop();
  }

  completeProject( deal: Deal ) {
    deal.Status = 'Completed';
    deal.ChangeDate = new Date().toLocaleString();
    this.firebaseService.updateDeal(deal.Id, deal);
    this.toastService.presentToast('Deal Completed');

    const notification: Notification = {
      Title: 'Your Deal Is Completed',
      Body: 'Your project ' + deal.Title + ' is completed',
      UserId: deal.From
    }

    this.messageService.sendNotificationByUserId(notification);
  }
}
