import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ToastService } from './toast.service';
import { Category } from '../models/category';
import { Service } from '../models/service';
import { Provider } from '../models/provider';
import { User } from '../models/user';
import { Listing } from '../models/listing';
import { Message } from '../models/message';
import { Notification } from '../models/notification';
import { element } from 'protractor';
import { CategoryService } from './category.service';
import { ServiceService } from './service.service';
import { ListingService } from './listing.service';
import { UserService } from './user.service';
import { MessageService } from './message.service';
import { Deal } from '../models/deal';
import { DealService } from './deal.service';
import { FCM } from '@ionic-native/fcm/ngx';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public categoryCollection: AngularFirestoreCollection<Category>;
  public categories: Observable<Category[]>;
  public categoriesArray: Category[];

  public serviceCollection: AngularFirestoreCollection<Service>;
  public services: Observable<Service[]>;
  public servicesArray: Service[];

  public listingCollection: AngularFirestoreCollection<Listing>;
  public listings: Observable<Listing[]>;
  public listingsArray: Listing[];

  public providerCollection: AngularFirestoreCollection<Provider>;
  public providers: Observable<Provider[]>;

  public userCollection: AngularFirestoreCollection<User>;
  public users: Observable<User[]>;
  public usersArray: User[];

  public messageCollection: AngularFirestoreCollection<Message>;
  public messages: Observable<Message[]>;
  public messagesArray: Message[];

  public dealCollection: AngularFirestoreCollection<Deal>;
  public deals: Observable<Deal[]>;
  public dealsArray: Deal[];

  public tokenCollection: AngularFirestoreCollection<Notification>;

  /*
  public itemsCollection: AngularFirestoreCollection<Item>;
  public usersDocument: AngularFirestoreDocument<MyUser>;
  private items: Observable<Item[]>;
  private userId: string;
  */

  constructor(
    private toastService: ToastService,
    private fcm: FCM,
    private db: AngularFirestore,
    private categoryService: CategoryService,
    private serviceService: ServiceService,
    private listingService: ListingService,
    private userService: UserService,
    private messageService: MessageService,
    private dealService: DealService ) {

    this.categoryCollection = this.db.collection('category');
    this.serviceCollection = this.db.collection('services');
    this.listingCollection = this.db.collection('listings');
    this.messageCollection = this.db.collection('messages');
    this.providerCollection = this.db.collection('users');
    this.userCollection = this.db.collection('users');
    this.dealCollection = this.db.collection('deals');
    this.tokenCollection = this.db.collection('tokens');

    /*
    this.usersDocument = this.db.collection( 'users' ).doc<MyUser>(this.userId);
    this.itemsCollection = this.usersDocument.collection<Item>( 'items' );
    */

    this.getCategoriesFromFirestore();
    this.getProvidersFromFirestore();
    this.getServicesFromFirestore();
    this.getListingsFromFirestore();
    this.getUsersFromFirestore();
    this.getMessagesFromFirestore();
    this.getDealsFromFirestore();
  }

  async registerDeviceToken(userId) {
    this.fcm.getToken().then(token => {
      this.toastService.presentToast(token);

      const notification: Notification = {
        Title: '',
        Body: '',
        Token: token
      }

      this.userCollection.doc(userId).update({Token: token});
    }, err => {
      this.toastService.presentToast(err);
    });
  }
  // ##############################################################
  // Get Item From Firestore Collection
  // ##############################################################
  getCategoriesFromFirestore() {
    this.categories = this.categoryCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return { Id, ...data };
        });
      })
    );
  }

  getProvidersFromFirestore() {
    this.providers = this.providerCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return { Id, ...data };
        });
      })
    );
  }

  getServicesFromFirestore() {
    this.services = this.serviceCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return { Id, ...data };
        });
      })
    );
  }

  getListingsFromFirestore() {
    this.listings = this.listingCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return { Id, ...data };
        });
      })
    );
  }

  getUsersFromFirestore() {
    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return { Id, ...data };
        });
      })
    );
  }

  getMessagesFromFirestore() {
    this.messages = this.messageCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return { Id, ...data };
        });
      })
    );
  }

  getDealsFromFirestore() {
    this.deals = this.dealCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return { Id, ...data };
        });
      })
    );
  }

  // ##############################################################
  // Convert Item Into Array
  // ##############################################################

  async getCategoriesArray() {
    this.categories.subscribe( res => {
      this.categoryService.categoryList = res;
      console.log('Get Category Array');
      console.log(res);
      return this.categoriesArray = res;
    });
  }

  async getServicesArray() {
    this.services.subscribe( res => {
      this.serviceService.serviceList = res;
      console.log('Get Service Array');
      console.log(res);
      return this.servicesArray = res;
    });
  }

  async getListingsArray() {
    this.listings.subscribe( res => {
      this.listingService.listingList = res;
      console.log('Get Listing Array');
      console.log(res);
      return this.listingsArray = res;
    });
  }

  async getUsersArray() {
    this.users.subscribe( res => {
      this.userService.userList = res;
      console.log('Get User Array');
      console.log(res);
      return this.usersArray = res;
    });
  }

  async getMessagesArray() {
    this.messages.subscribe( res => {
      this.messageService.messageList = res;
      console.log('Get Message Array');
      console.log(res);
      return this.messagesArray = res;
    });
  }

  async getDealsArray() {
    this.deals.subscribe( res => {
      this.dealService.dealList = res;
      console.log('Get Deal Array');
      console.log(res);
      return this.dealsArray = res;
    });
  }

  // ##############################################################
  // Get Item From Local Collection
  // ##############################################################

  getCategories() {
    return this.categories;
  }

  getProviders() {
    return this.providers;
  }

  getServices() {
    return this.services;
  }

  getUsers() {
    return this.users;
  }

  // ##############################################################
  // Add Item To Collection
  // ##############################################################

  addCategory(category: Category) {
    return this.categoryCollection.add(category);
  }

  addProvider(provider: Provider) {
    return this.providerCollection.add(provider);
  }

  addService(service: Service) {
    return this.serviceCollection.add(service);
  }

  addListing(listing: Listing) {
    return this.listingCollection.add(listing);
  }

  addMessage(message: Message) {
    return this.messageCollection.add(message);
  }

  addUser(user: User) {
    return this.userCollection.doc(user.Id).set(user);
  }

  addDeal(deal: Deal) {
    return this.dealCollection.add(deal);
  }

  // ##############################################################
  // Remove Item From Collection
  // ##############################################################

  removeCategory(id) {
    return this.categoryCollection.doc(id).delete();
  }

  removeService(id) {
    return this.serviceCollection.doc(id).delete();
  }

  removeProvider(id) {
    return this.providerCollection.doc(id).delete();
  }

  removeListing(id) {
    return this.listingCollection.doc(id).delete();
  }

  removeDead(id) {
    return this.dealCollection.doc(id).delete();
  }

  // ##############################################################
  // Update Item In Collection
  // ##############################################################

  updateCategory(id: string, category: Category) {
    this.categoryCollection.doc(id).update(category)
  }

  updateUser(id: string, user: User) {
    this.userCollection.doc(id).update(user);
  }

  getUser(id: string): Observable<User> {
    return this.userCollection.doc<User>(id).valueChanges().pipe(
      take(1),
      map(user => {
        user.Id = id;
        return user;
      })
    );
  }

  updateDeal(id: string, deal: Deal) {
    this.dealCollection.doc(id).update(deal);
  }


  /*
  getItemFromFirestore() {
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getItems() {
    this.getItemFromFirestore();
    return this.items;
  }

  getItem(id) {
    return this.itemsCollection.doc<Item>(id).valueChanges();
  }

  updateItem(item: Item, id: string) {
    return this.itemsCollection.doc(id).update(item);
  }

  addItem(item: Item) {
    return this.itemsCollection.add(item);
  }

  removeItem(id) {
    return this.itemsCollection.doc(id).delete();
  }

  getItemByBarcode(barcode) {
  }
  */

}
