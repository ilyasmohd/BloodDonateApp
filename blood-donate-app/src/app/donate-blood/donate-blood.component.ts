import { Component, OnInit } from '@angular/core';
import { BloodService } from '../services/blood.service';
import { IDonateBlood } from '../donate-blood/donate-blood';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-donate-blood',
  templateUrl: './donate-blood.component.html',
  styleUrls: ['./donate-blood.component.css']
})
export class DonateBloodComponent implements OnInit {

  bloodDonorsList: IDonateBlood[];
  constructor(private bloodService: BloodService) { }

  ngOnInit() {
    this.bloodService.addBloodDonor();
  }

  /*
  public print_state(state_id) {
    // given the id of the <select> tag as function argument, it inserts <option> tags
    var option_str:Observable<IReceiveBlood[]>;
    option_str.length = 0;
    option_str.options[0] = new Option('Select State', '');
    option_str.selectedIndex = 0;
    for (var i = 0; i < state_arr.length; i++) {
      option_str.options[option_str.length] = new Option(state_arr[i], state_arr[i]);
    }
  }


  print_city(city_id, city_index) {
    var option_str = document.getElementById(city_id);
    option_str.length = 0;	// Fixed by Julian Woods
    option_str.options[0] = new Option('Select City', '');
    option_str.selectedIndex = 0;
    var city_arr = s_a[city_index].split("|");
    for (var i = 0; i < city_arr.length; i++) {
      option_str.options[option_str.length] = new Option(city_arr[i], city_arr[i]);
    }
  } 
  */

}
