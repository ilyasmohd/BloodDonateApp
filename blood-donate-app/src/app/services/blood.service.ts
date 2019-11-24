import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {IReceiveBlood} from '../receive-blood/receive-blood';
import {ReceiveBlood} from '../receive-blood/mock-receiveBlood';

@Injectable({
  providedIn: 'root'
})
export class BloodService {

  constructor() { }

  getBloodDonorsList(): Observable<IReceiveBlood[]>{
    console.log('received the request for blood donors list');
    return of(ReceiveBlood);
  }

  addBloodDonor(): void{
    return;
  }
}
