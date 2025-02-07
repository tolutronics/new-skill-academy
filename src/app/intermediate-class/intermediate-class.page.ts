import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, IonSlides } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import * as firebase from 'firebase/app';

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
 int;
 allbought;
 all;
text="CHOOSE";
text2="CHOOSE"
act;
buy="BUY #600"
int_all_price;
int_each_price;
int_each_price2;
all_access_price;
disabled:boolean=false;

  constructor(public afs:AngularFirestore,public activatedRoute:ActivatedRoute, public navCtrl: NavController, private router: Router, private alertCtrl: AlertController,) {
  
    this.afs.doc(`/Prices/IntermediateClass`).valueChanges().subscribe(res=>{
      this.int_all_price=res['all-intermediate'],
      this.all_access_price = res['all-access'],
      this.int_each_price2= res['each-intermediate'],
      this.int_each_price= 'NGN '+res['each-intermediate']
    })
    this.afs.doc(`/Subscriptions/${firebase.auth().currentUser.uid}`).valueChanges().subscribe(res=>{
     
      this.int =res['IntermediateClass'];
      this.all =res['Allaccess'];
      console.log('testing',this.all);
      
      if (this.int=='true') {
        this.disabled=true;
        this.act=true;
        this.text='PAID';
        this.text2='DISABLED'
        this.int_each_price="TAKE CLASS" 
      }else if(this.all=='true'){
        this.text2='PAID';
        this.text='DISABLED';
        this.act=true;
        this.disabled=true;
        this.int_each_price="TAKE CLASS"
      }
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

  checkout2(i,k,l,m){
    var q ={
      price:i,
      title:k,
      class:'intermediate',
      type:l,
      index:m
    }
    if (this.int_each_price=='TAKE CLASS') {
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
   back() {
    this.router.navigate(['/tabs/tab2']);
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
  if (this.int=='true' || this.all=='true') {
    this.router.navigate(['/advancechat']);
  }else{
    this.Alert('Please Subscribe to gain access', 'info');
  
  }
}

}
