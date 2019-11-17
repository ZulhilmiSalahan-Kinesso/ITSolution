import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';

  constructor(
    private messageService: MessageService,
    private navCtrl: NavController,
    private authService: AuthService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService) {
      this.firebaseService.getCategoriesArray();
      this.firebaseService.getServicesArray();
      this.firebaseService.getListingsArray();
      this.firebaseService.getMessagesArray();
      this.firebaseService.getUsersArray();
    }

    validation_messages = {
      'email': [
        { type: 'required', message: 'Email is required.' },
        { type: 'pattern', message: 'Please enter a valid email.' }
      ],
      'password': [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password must be at least 5 characters long.' }
      ]
    };

  ngOnInit() {
    // TODO
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  async loginUser(value) {
    this.authService.loginUser(value)
    .then(res => {
    }, err => {
      this.toastService.presentToast(err.message);
    });
  }

  goToRegisterPage(){
    this.navCtrl.navigateForward('/register');
  }

  goToTabsPage(){
    this.navCtrl.navigateForward('/tabs');
  }

  gotoProfile() {
    this.navCtrl.navigateForward('/profile');
  }

  gotoNotifications() {
    this.navCtrl.navigateForward('/notification');
  }

  gotoServiceRequest() {
    this.navCtrl.navigateForward('/itservice-request');
  }

  gotoMessaging() {
    this.navCtrl.navigateForward('/messaging');
  }

  gotoSettings() {
    this.navCtrl.navigateForward('/settings');
  }

  gotoMyServices() {
    const navigationExtras: NavigationExtras = {
      state: {
        UserId : this.authService.userDetails().uid
      }
    }
    this.router.navigate(['my-services'], navigationExtras);
  }

  logout() {
    this.authService.logoutUser();
    console.log(this.authService.userDetails());
  }

  getUser() {
    console.log(this.authService.userDetails());
  }

  registerToken() {
    const userId = this.authService.userDetails().uid;
    this.firebaseService.registerDeviceToken(userId);
  }
}
