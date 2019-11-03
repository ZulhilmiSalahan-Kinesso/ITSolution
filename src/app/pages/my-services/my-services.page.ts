import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../../services/firebase.service';
import { Listing } from 'src/app/models/listing';
import { CategoryService } from 'src/app/services/category.service';
import { ServiceService } from 'src/app/services/service.service';
import { Category } from 'src/app/models/category';
import { Service } from 'src/app/models/service';
import { ListingService } from 'src/app/services/listing.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.page.html',
  styleUrls: ['./my-services.page.scss'],
})
export class MyServicesPage implements OnInit {

  public categories: Category[];
  public services: Service[];
  private filteredListings: Listing[] = [];
  private userId: string;

  constructor(
    private navCtrl: NavController,
    private listingService: ListingService,
    private categoryService: CategoryService,
    private serviceService: ServiceService,
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.firebaseService.getCategoriesArray();
    this.firebaseService.getServicesArray();
    this.firebaseService.getListingsArray();

    console.log('init my service');
    this.route.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userId = this.router.getCurrentNavigation().extras.state.UserId;
        console.log('UserId : ' + this.userId);
        this.listingService.listingList.forEach(element => {
          element.Category = this.categoryService.categoryList.find(x => x.Id === element.CategoryId).Name;
          element.Service = this.serviceService.serviceList.find(x => x.Id === element.ServiceId).Name;
          if ( element.UserId === this.userId ) {
            this.filteredListings.push(element);
          }
        });
      }
    });
  }

  ngOnInit() {
  }

  back() {
    this.navCtrl.pop();
  }

  addListing() {
    this.navCtrl.navigateForward('/create-listing');
  }

  removeListing(listing: Listing){
    this.firebaseService.removeListing(listing.Id);
  }
}
