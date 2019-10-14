import { Component,ViewChild } from '@angular/core';
import { NavController, IonSlides, AlertController} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import * as firebase from 'firebase/app';

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
  disabled:boolean=false;
  all;
  beg;
  allbought;
  text="CHOOSE";
  text2="CHOOSE"
  act:boolean=false;;
  buy="BUY #500"
 
   constructor(public afs:AngularFirestore,public activatedRoute:ActivatedRoute, public navCtrl: NavController,private router: Router,  private alertCtrl: AlertController, ) {
     
    this.afs.doc(`/Subscriptions/${firebase.auth().currentUser.uid}`).valueChanges().subscribe(res=>{
     
      this.beg =res['BeginnerClass'];
      this.all =res['Allaccess'];
      if (this.beg=='true') {
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
  console.log(this.beg, this.all);
  if (this.beg=='true' || this.all=='true') {
    this.router.navigate(['/beginnerchat']);
  }else{
    this.Alert('Please Subscribe to gain access', 'info');
  
  }
  
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

  checkout2(i,k,l){
    var q ={
      price:i,
      title:k,
      class:'beginner',
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
 
 }
 