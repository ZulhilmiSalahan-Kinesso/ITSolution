import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ToastService } from 'src/app/services/toast.service';
import { Category } from 'src/app/models/category';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {

  private categories: Category[];
  private category: Category = {
    Name: '',
    Image: '',
    ClickCount: 0
  };
  constructor(
    private categoryFirestore: FirebaseService,
    private toastService: ToastService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  back() {
    this.navCtrl.pop();
  }

  addCategory() {
    this.categoryFirestore.addCategory(this.category);
    this.category = {
      Name: '',
      Image: '',
      ClickCount: 0
    };
    this.navCtrl.pop();
  }
}
