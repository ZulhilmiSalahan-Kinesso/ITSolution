import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Deal } from 'src/app/models/deal';
import { from } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Provider } from 'src/app/models/provider';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.page.html',
  styleUrls: ['./create-deal.page.scss'],
})
export class CreateDealPage implements OnInit {

  private selectedProvider: Provider;

  private deal: Deal = {
    Title: '',
    Description: '',
    Offer: 0,
    From: '',
    To: '',
    Status: '',
    ChangeDate: 0
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
    this.route.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.selectedProvider = this.router.getCurrentNavigation().extras.state.Provider;
        this.deal.To = this.selectedProvider.Id;
      }
    });

    // Get current user
    this.deal.From = this.authService.userDetails().uid;
  }

  ngOnInit() {
  }

  addDeal() {
    this.deal.Status = 'New';
    this.firebaseService.addDeal(this.deal);
    this.toastService.presentToast('Successfully send deals');
    this.navCtrl.pop();
  }

  back() {
    this.navCtrl.pop();
  }
}
