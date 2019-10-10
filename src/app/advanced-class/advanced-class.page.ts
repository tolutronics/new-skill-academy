import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, IonSlides} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-advanced-class',
  templateUrl: './advanced-class.page.html',
  styleUrls: ['./advanced-class.page.scss'],
})
export class AdvancedClassPage {

  @ViewChild('slides', {static:true}) slider: IonSlides;
  segment = 0;
  SwipedTabsIndicator :any= null;
  num=[];
  isVisible:any;
  key=10;
 cos=10;
 bought="";

  constructor(public activatedRoute:ActivatedRoute,public navCtrl: NavController, private router: Router, private alertCtrl: AlertController,) {
            
    this.activatedRoute.queryParams.subscribe((res)=>{

      this.bought = res['bought'];
      
    });

    this.num = [
      {title: 'How to cut a gown',
       price: '700'},
       {title: 'How to sew a gown',
       price: '700'},
       {title: 'Making a Blouse',
       price: '700'},
       {title: 'Complete cutting guide',
       price: '700'},
       {title: 'Anatomy of Sewing',
       price: '700'},
    ];
  
  }

 

  checkout(i,k,l){
    var q ={
      price:i,
      title:k,
      class:'advance',
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
    this.Alert('You are yet to pay for the Advance Class', 'info');
    this.router.navigate(['/advancechat'])
  }

}
