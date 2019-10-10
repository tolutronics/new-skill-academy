import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})
export class ClassesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private router: Router) {

   
  }

 

  toBeginner(){
    this.router.navigate(['/beginner-class'])
  }
   toIntermediate(){
    this.router.navigate(['/intermediate-class'])
  }
   toAdvanced(){
    this.router.navigate(['/advanced-class'])
  }



}
