import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastService } from './toast.service';
import { FirebaseService } from './firebase.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User = {
    Id: '',
    Name: '',
    Email: '',
    PhoneNumber: '',
    Image: '',
    Occupation: '',
    Location: '',
    CustomerCount: 0,
    Rating: 0,
    ProjectInvolved: '',
    InterestedField: ''
  };

  constructor(
    private navCtrl: NavController,
    private firebaseUser: FirebaseService,
    private afAuth: AngularFireAuth,
    private toastService: ToastService
    ) { }

  registerUser(value) {
    return new Promise<any>( (resolve, reject) => {
      this.afAuth
      .auth
      .createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => {
          this.user = {
            Id: res.user.uid,
            Name: '',
            Email: value.email,
            PhoneNumber: ''
          };
          this.firebaseUser.addUser(this.user);
          this.toastService.presentToast('Successfully register user');
          resolve(res);
        },
        err => {
          this.toastService.presentToast(err);
          reject(err);
      });
    });
   }

   loginUser(value) {
    return new Promise<any>( (resolve, reject) => {
      this.afAuth.auth
      .signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => {
          this.toastService.presentToast('User logged in');
          resolve(res);
        },
        err => {
          this.toastService.presentToast(err);
          reject(err);
        });
    });
   }

   logoutUser() {
     return new Promise((resolve, reject) => {
         this.afAuth
         .auth
         .signOut()
         .then(() => {
           this.toastService.presentToast('User logged out');
           resolve();
         }).catch((err) => {
           this.toastService.presentToast(err);
           reject();
         });
     });
   }

   userDetails() {
     return this.afAuth
     .auth
     .currentUser;
   }
}
