import {
  Component,
  OnInit
} from '@angular/core';
import {
  FirebaseService
} from 'src/app/services/firebase.service';
import {
  Provider
} from 'src/app/models/provider';
import {
  NavController
} from '@ionic/angular';
import {
  UserService
} from 'src/app/services/user.service';
import {
  ToastService
} from 'src/app/services/toast.service';
import {
  Message
} from 'src/app/models/message';
import {
  AuthService
} from 'src/app/services/auth.service';
import {
  Router,
  ActivatedRoute,
  NavigationExtras
} from '@angular/router';
import {
  Category
} from 'src/app/models/category';
import {
  Service
} from 'src/app/models/service';
import {
  Listing
} from 'src/app/models/listing';
import {
  ListingService
} from 'src/app/services/listing.service';
import {
  User
} from 'src/app/models/user';

@Component({
  selector: 'app-itprovider',
  templateUrl: './itprovider.page.html',
  styleUrls: ['./itprovider.page.scss'],
})
export class ITProviderPage implements OnInit {

  selectedCategory: Category;
  selectedService: Service;
  filteredProviders: User[] = [];
  providers: Provider[];
  listing: Listing[];
  message: Message = {
    SenderId: '',
    SenderName: '',
    ReceiverId: '',
    ReceiverName: ''
  };

  constructor(
    private navCtrl: NavController,
    private firebaseService: FirebaseService,
    private userService: UserService,
    private listingService: ListingService,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.firebaseService.getUsersArray();
    this.firebaseService.getListingsArray();
    this.route.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.selectedCategory = this.router.getCurrentNavigation().extras.state.Category;
        this.selectedService = this.router.getCurrentNavigation().extras.state.Service;
        this.listingService.listingList.forEach(element => {
          if (element.ServiceId === this.selectedService.Id) {
            const user = this.userService.userList.find(x => x.Id === element.UserId);
            this.filteredProviders.push(user);
          }
        });
      } else {
        this.filteredProviders = this.userService.userList;
      }
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {


  }

  makecall(receiverId, phoneNumber) {
    if (phoneNumber === undefined) {
      this.toastService.presentToast('User Not Set Phone Number');
    } else {
      this.message = {
        SenderId: this.authService.userDetails().uid,
        SenderName: '',
        ReceiverId: receiverId,
        ReceiverName: ''
      }

      console.log(this.message);
      this.firebaseService.addMessage(this.message);
      window.open('https://api.whatsapp.com/send?phone=6' + phoneNumber, '_blank');
    }
  }

  back() {
    this.navCtrl.pop();

    const navigationExtras: NavigationExtras = {
      state: {
        Category: this.selectedCategory,
        Service: this.selectedService
      }
    }

    if ( this.selectedCategory.Id )
    {
      this.router.navigate(['itservice'], navigationExtras);
    } else {
      this.navCtrl.pop();
    }
  }

  createDeal(provider: Provider) {
    const navigationExtras: NavigationExtras = {
      state: {
        Provider: provider
      }
    }

    this.router.navigate(['create-deal'], navigationExtras);
  }

  viewListing(userId) {
    const navigationExtras: NavigationExtras = {
      state: {
        UserId : userId
      }
    }
    this.router.navigate(['my-services'], navigationExtras);
  }
}
