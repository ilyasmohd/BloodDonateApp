import { Component, OnInit } from '@angular/core';
import {BloodService} from '../services/blood.service';
import {IReceiveBlood} from '../receive-blood/receive-blood';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-receive-blood',
  templateUrl: './receive-blood.component.html',
  styleUrls: ['./receive-blood.component.css']
})
export class ReceivebloodComponent implements OnInit {

  bloodDonorsList: IReceiveBlood[];
  constructor(private bloodService: BloodService) { }

  ngOnInit() {
    this.bloodService.getBloodDonorsList().subscribe(donors=> this.bloodDonorsList = donors);
  }

}
