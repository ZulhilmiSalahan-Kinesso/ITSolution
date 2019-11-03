import { Injectable } from '@angular/core';
import { Deal } from '../models/deal';

@Injectable({
  providedIn: 'root'
})
export class DealService {
 dealList: Deal[];
 
  constructor() { }
}
