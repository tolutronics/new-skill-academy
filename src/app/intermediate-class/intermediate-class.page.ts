import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, IonSlides } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-intermediate-class',
  templateUrl: './intermediate-class.page.html',
  styleUrls: ['./intermediate-class.page.scss'],
})
export class IntermediateClassPage {
  @ViewChild('slides',{static:true}) slider: IonSlides;
  segment = 0;
  SwipedTabsIndicator :any= null;
  num=[];
  isVisible:any;
  key=10;
 cos=10;
 bought="";

  constructor(public activatedRoute:ActivatedRoute, public navCtrl: NavController, private router: Router, private alertCtrl: AlertController,) {
  
         
    this.activatedRoute.queryParams.subscribe((res)=>{

      this.bought = res['bought'];
      
    });

    this.num = [
      {title: 'How to cut a gown',
       price: '600'},
       {title: 'How to sew a gown',
       price: '600'},
       {title: 'Making a Blouse',
       price: '600'},
       {title: 'Complete cutting guide',
       price: '600'},
       {title: 'Anatomy of Sewing',
       price: '600'},
    ];
    this.isVisible = true;
  }

  checkout(i,k,l){
    var q ={
      price:i,
      title:k,
      class:'intermediate',
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

  async Alert(msg, sub) {
    const alert = await this.alertCtrl.create({
    message: msg,
    subHeader: sub,
    buttons: ['OK']
   });
    await alert.present();
}


  member(){
    this.Alert('You are yet to pay for the Intermediate Class', 'info');
    this.router.navigate(['/intermediatechat'])
  }

}
