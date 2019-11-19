import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Deal } from 'src/app/models/deal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-final-deal',
  templateUrl: './final-deal.page.html',
  styleUrls: ['./final-deal.page.scss'],
})
export class FinalDealPage implements OnInit {

  private deal: Deal = new Deal();

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(param => {
      this.deal = this.router.getCurrentNavigation().extras.state.Deal;
    });
  }

  ngOnInit() {
  }

  back() {
    this.navCtrl.pop();
  }
}
