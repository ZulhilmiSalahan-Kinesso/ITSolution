import { Injectable } from '@angular/core';
import { Listing } from '../models/listing';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  public listingList: Listing[];

  constructor() { }
}
