import { Injectable } from '@angular/core';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public serviceList: Service[];

  constructor() { }
}
