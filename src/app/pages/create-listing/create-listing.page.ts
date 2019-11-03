import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CategoryService } from 'src/app/services/category.service';
import { Listing } from 'src/app/models/listing';
import { AuthService } from 'src/app/services/auth.service';
import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.page.html',
  styleUrls: ['./create-listing.page.scss'],
})
export class CreateListingPage implements OnInit {

  public listing: Listing = {
    UserId: '',
    Category:'',
    CategoryId: '',
    Service: '',
    ServiceId: '',
    Title: '',
    Description: '',
    RatePerHour: 0
  };

  filteredServices: Service[] = [];

  constructor(
    private navCtrl: NavController,
    private firebaseService: FirebaseService,
    private categoryService: CategoryService,
    private serviceService: ServiceService,
    private authService: AuthService
  ) {
    this.firebaseService.getCategoriesArray();
    this.firebaseService.getServicesArray();
    console.log(this.authService.userDetails().uid);
  }

  ngOnInit() {
  }

  filterService() {
    this.filteredServices = [];
    this.serviceService.serviceList.forEach(element => {
      if ( element.CategoryId === this.listing.CategoryId ) {
        this.filteredServices.push(element);
      }
    });
    console.log('filter service ' + this.listing.CategoryId);
  }

  addListing() {
    this.listing.UserId = this.authService.userDetails().uid;
    this.firebaseService.addListing(this.listing);
    this.navCtrl.pop();
  }

  back() {
    this.navCtrl.pop();
  }
}
