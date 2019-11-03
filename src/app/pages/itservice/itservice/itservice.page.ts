import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';
import { CategoryPage } from '../../category/list-category/category.page';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-itservice',
  templateUrl: './itservice.page.html',
  styleUrls: ['./itservice.page.scss'],
})
export class ITServicePage implements OnInit {

  selectedCategory: Category;
  services: Service[];
  filteredServices: Service[] = [];

  constructor(
    private navCtrl: NavController,
    private serviceService: ServiceService,
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.firebaseService.getServicesArray();
    this.route.queryParams.subscribe(param => {
      this.filteredServices = [];
      if ( this.router.getCurrentNavigation().extras.state ) {
        this.selectedCategory = this.router.getCurrentNavigation().extras.state.Category;
        this.serviceService.serviceList.forEach(element => {
          if ( element.CategoryId === this.selectedCategory.Id ) {
            this.filteredServices.push(element);
          }
        });
      } else {
        this.filteredServices = this.serviceService.serviceList;
      }

    });
  }

  ngOnInit() {
    this.firebaseService.getServices().subscribe( res => {
      this.services = res;
    });
  }

  ionViewWillEnter() {
    this.firebaseService.getServices().subscribe( res => {
      this.services = res;
    });
  }

  removeService( id: string ) {
    this.firebaseService.removeService(id);
  }

  back() {
    this.navCtrl.pop();
  }

  addService() {
    this.navCtrl.navigateForward('add-service');
  }

  updateService(){
    this.navCtrl.navigateForward('add-service');
  }

  showProviderList( service: Service ) {
    const navigationExtras: NavigationExtras = {
      state: {
        Category: this.selectedCategory,
        Service: service
      }
    }
    this.router.navigate(['itprovider'], navigationExtras);
  }
}
