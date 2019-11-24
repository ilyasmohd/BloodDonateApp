import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonateBloodComponent } from '../app/donate-blood/donate-blood.component';
import { ReceivebloodComponent } from '../app/receive-blood/receive-blood.component';
import { HomeComponent } from '../app/home/home.component';
const routes: Routes = [
  { path: 'rblood', component: ReceivebloodComponent },
  { path: 'dblood', component: DonateBloodComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
