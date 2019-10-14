import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, IonSlides} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import * as firebase from 'firebase/app';

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
 adv;
all;
allbought;
text="CHOOSE";
text2="CHOOSE"
act;
disabled:boolean=false;
buy="BUY #700"
  constructor(private afs: AngularFirestore,public activatedRoute:ActivatedRoute,public navCtrl: NavController, private router: Router, private alertCtrl: AlertController,) {
  this.afs.doc(`/Subscriptions/${firebase.auth().currentUser.uid}`).valueChanges().subscribe(res=>{
     
      this.adv =res['AdvancedClass'];
      this.all =res['Allaccess'];
      console.log('testing',this.all);
      
      if (this.adv=='true') {
        this.disabled=true;
        this.act=true;
        this.text='PAID';
        this.text2='DISABLED'
        this.buy="TAKE CLASS"
      }else if(this.all=='true'){
        this.text2='PAID';
        this.text='DISABLED';
        this.act=true;
        this.disabled=true;
        this.buy="TAKE CLASS"
      }
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

  checkout2(i,k,l){
    var q ={
      price:i,
      title:k,
      class:'advance',
      type:l
    }
    if (this.buy=='TAKE CLASS') {
      this.router.navigate(['/checkout'])
    }else{
    this.router.navigate(['/contact'], {
      queryParams:q,
    });
  }
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


back() {
  this.router.navigate(['/tabs/tab2']);
}


  member(){
    if (this.adv=='true' || this.all=='true') {
      this.router.navigate(['/advancechat']);
    }else{
      this.Alert('Please Subscribe to gain access', 'info');
    
    }
    
  }

}
