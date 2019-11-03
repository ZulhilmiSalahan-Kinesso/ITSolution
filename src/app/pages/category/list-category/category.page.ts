import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Category } from 'src/app/models/category';
import { element } from 'protractor';
import { ToastService } from 'src/app/services/toast.service';
import { NavController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  public selectedCategory: Category;
  private filterText: string;
  private categories: Category[];
  private category: Category = {
    Name: '',
    Image: '',
    ClickCount: 0
  };

  constructor(
    private firebaseService: FirebaseService,
    private categoryService: CategoryService,
    private toastService: ToastService,
    private navCtrl: NavController,
    private router: Router
  ) {
    this.firebaseService.getCategoriesArray();
    this.firebaseService.getServicesArray();
    this.firebaseService.getUsersArray();
    this.firebaseService.getListingsArray();
  }

  ngOnInit() {
    this.firebaseService.getCategories().subscribe( res => {
      this.categories = res;
    });
  }

  ionViewDidEnter() {
    this.firebaseService.getCategories().subscribe( res => {
      this.categories = res;
    });
  }

  addCategory() {
    this.navCtrl.navigateForward('add-category');
  }

  removeCategory(category: Category) {
    this.firebaseService.removeCategory(category.Id);
  }

  categoryClick(category) {
    if(isNaN(category.ClickCount))
    {
      category.ClickCount = 0;
    }
    category.ClickCount = category.ClickCount + 1;
    this.firebaseService.updateCategory(category.Id, category);
  }

  notifications() {
    this.navCtrl.navigateForward('notification');
  }

  showServiceList(category: Category) {
    const navigationExtras: NavigationExtras = {
      state: {
        Category: category
      }
    }
    this.categoryClick(category);
    this.router.navigate(['itservice'], navigationExtras);
    //this.navCtrl.navigateForward('itservice', );
  }

  filterCategory() {
    /*
    if (this.filterCategory.toString() == '') {
      this.firebaseService.getCategories().subscribe( res => {
        this.categories = res;
      });
    } else {
      this.categories = this.categories.filter( (element, index, array) => {
        if (element.Name.indexOf(this.filterCategory.toString()) >= 0) {
          return element;
        }
      });
    }
    */
   this.toastService.presentToast('Not Yet Implement');
  }
}
