import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Routes } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User = {
    Name: '',
    Image: 'https://www.pureingenuity.com/wp-content/uploads/2018/07/empty-profile-image.jpg',
    Email: '',
    PhoneNumber: '',
    Occupation: 'Technical QA Engineer',
    Location: 'Cheras, Kuala Lumpur',
    Rating: 5,
    CustomerCount: 4,
    InterestedField: 'Some of interested field I like',
    ProjectInvolved: 'Involve in many big project'
  };

  profileTab: string = 'description';

  private stars: string[];

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private firebaseUser: FirebaseService) { }

  ngOnInit() {
    this.getUserInformation();
    this.stars = new Array(this.user.Rating);
  }

  ionViewWillEnter() {
    this.getUserInformation();
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  getUserInformation() {
    this.firebaseUser.getUser(this.authService.userDetails().uid).subscribe(
      res => {
        this.user = res;
      }
    );
  }

  gotoUpdateProfile() {
    this.navCtrl.navigateForward('update-profile');
  }

  back() {
    this.navCtrl.pop();
  }
}
