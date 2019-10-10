import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor( private router: Router) {

   
  }

  checkout(){
    this.router.navigate(['/contact'])
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

