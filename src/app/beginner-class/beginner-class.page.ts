import { Component,ViewChild } from '@angular/core';
import { NavController, IonSlides, AlertController} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beginner-class',
  templateUrl: './beginner-class.page.html',
  styleUrls: ['./beginner-class.page.scss'],
})
export class BeginnerClassPage {
  @ViewChild('slides', {static:true}) slider: IonSlides;
  segment = 0;
  SwipedTabsIndicator :any= null;
  num=[];
  isVisible:any;
  key=10;
 cos=10;
  bought="";
  
 
   constructor(public activatedRoute:ActivatedRoute, public navCtrl: NavController,private router: Router,  private alertCtrl: AlertController, ) {
     
    this.activatedRoute.queryParams.subscribe((res)=>{

      this.bought = res['bought'];
      
    });

    this.num = [
       {title: 'How to cut a gown',
        price: '500'},
        {title: 'How to sew a gown',
        price: '500'},
        {title: 'Making a Blouse',
        price: '500'},
        {title: 'Complete cutting guide',
        price: '500'},
        {title: 'Anatomy of Sewing',
        price: '500'},
     ];
     this.isVisible = true;
   }

   async Alert(msg, sub) {
    const alert = await this.alertCtrl.create({
    message: msg,
    subHeader: sub,
    buttons: ['OK']
   });
    await alert.present();
}


  member(){
    this.Alert('You are yet to pay for the Beginner Class', 'info');
    this.router.navigate(['/beginnerchat'])
  }
 
 
  back() {
    this.router.navigate(['/tabs/tab2']);
  }
  

   checkout(i,k,l){
    var q ={
      price:i,
      title:k,
      class:'beginner',
      type:l
    }
    this.router.navigate(['/contact'], {
      queryParams:q,
    });

  }
 
    ionViewDidLoad() {
     console.log('ionViewDidLoad BeginnerClassPage');
   }

   async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }
 
 }
 