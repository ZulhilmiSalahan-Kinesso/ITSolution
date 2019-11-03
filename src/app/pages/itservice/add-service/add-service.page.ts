import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Service } from 'src/app/models/service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.page.html',
  styleUrls: ['./add-service.page.scss'],
})
export class AddServicePage implements OnInit {

  service: Service = {
    CategoryId: '',
    Name: '',
    Image: '',
    ClickCount: 0
  };

  constructor(
    private navCtrl: NavController,
    private firebaseService: FirebaseService,
    private categoryService: CategoryService
  ) {
    this.firebaseService.getCategoriesArray();
  }

  ngOnInit() {
  }

  addService() {
    this.firebaseService.addService(this.service);
    this.service = {
      CategoryId: '',
      Name: '',
      Image: '',
      ClickCount: 0
    };
    this.navCtrl.pop();
  }
}
