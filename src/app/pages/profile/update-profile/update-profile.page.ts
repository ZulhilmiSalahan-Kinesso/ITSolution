import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  user: User = {
    Name: '',
    Email: '',
    PhoneNumber: ''
  };

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getUserInformation();
  }

  getUserInformation() {
    this.firebaseService.getUser(this.authService.userDetails().uid).subscribe(
      res => {
        this.user = res;
      }
    );
  }

  updateUser() {
    this.firebaseService.updateUser(this.authService.userDetails().uid, this.user);
    this.navCtrl.pop();
  }

  back() {
    this.navCtrl.pop();
  }
}
