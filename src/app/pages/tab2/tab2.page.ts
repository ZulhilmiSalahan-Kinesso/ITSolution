import { Component, OnInit, OnChanges } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Category } from 'src/app/models/category';
import { Service } from 'src/app/models/service';
import { Provider } from 'src/app/models/provider';
import { CategoryService } from 'src/app/services/category.service';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  categories: Category[];
  categoryPages: Category[][] = [];
  services: Service[];
  servicePages: Service[][] = [];
  users: Provider[];
  userPages: User[][] = [];

  constructor(
    public actionSheetController: ActionSheetController,
    private firebaseService: FirebaseService,
    private categoryService: CategoryService,
    private serviceService: ServiceService,
    private userService: UserService,
    public navCtrl: NavController) {
      this.firebaseService.getCategoriesArray();
      this.firebaseService.getServicesArray();
      this.firebaseService.getUsersArray();
    }

    ngOnInit() {
      let pageCount = (this.categoryService.categoryList.length / 3);
      pageCount = Math.ceil(pageCount);
      for (let x = 0; x < pageCount; x++) {
        const start = (x * 3);
        const end = start + 3;
        this.categoryPages.push(this.categoryService.categoryList.slice(start, end));
      }

      let pageCount2 = (this.serviceService.serviceList.length / 3);
      pageCount2 = Math.ceil(pageCount2);
      for (let x = 0; x < pageCount2; x++) {
        const start = (x * 3);
        const end = start + 3;
        this.servicePages.push(this.serviceService.serviceList.slice(start, end));
      }

      let pageCount3 = (this.userService.userList.length / 3);
      pageCount3 = Math.ceil(pageCount3);
      for (let x = 0; x < pageCount3; x++) {
        const start = (x * 3);
        const end = start + 3;
        this.userPages.push(this.userService.userList.slice(start, end));
      }
    }

    gotoService() {
      this.navCtrl.navigateForward('itservice');
    }

    gotoCategory() {
      this.navCtrl.navigateForward('category');
    }

    gotoProvider() {
      this.navCtrl.navigateForward('itprovider');
    }

    async presentActionSheet() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Menu',
        buttons: [{
            text: 'Home',
            icon: 'home',
            handler: () => {
            }
          }, {
          text: 'Category',
          icon: 'trash',
          handler: () => {
            this.navCtrl.navigateForward('/category');
          }
        }, {
          text: 'Service',
          icon: 'share',
          handler: () => {
            this.navCtrl.navigateForward('/itservice');
          }
        }, {
          text: 'IT Freelancer',
          icon: 'arrow-dropright-circle',
          handler: () => {
            this.navCtrl.navigateForward('/itprovider');
          }
        }, {
          text: 'Users',
          icon: 'people',
          handler: () => {
            this.navCtrl.navigateForward('/users');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    }
}
