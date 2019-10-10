
//import { Facebook } from '@ionic-native/facebook/ngx';
import { Component,ViewChild } from '@angular/core';
import { NavController, IonSlides} from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page  {
  @ViewChild('slides',{static:true}) slider: IonSlides;
  segment = 0;
  SwipedTabsIndicator :any= null;
  tabs:any=[];
  username={} as any;
  email={} as any;
  courses={} as any;
  dat={} as any;
  itemDoc;
  url:string;
  data:string;
   info:any;
   dev:any;
   user:any;
   C_user:any;
   //    mail:any;
displayCatName:string;

  name : any;

  constructor(private router:Router, private afs: AngularFirestore,private store:NativeStorage,  public navCtrl: NavController) {
   

 
    // var ref=firebase.database().ref('/User');
    // ref.on('value',this.gotData,this.errData);
    // console.log('to print out');  
   // this.get();
      this.getData1();
      this.getData2();
      console.log(this.key);
   
  }

  
  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }


editProfile(){
   this.router.navigate(['/editprofile']);
}

newCourse(){
  this.router.navigate(['/addnewcourse']);

}



  
    

getData1(){
  this.itemDoc = this.afs.doc(`/userProfile/${firebase.auth().currentUser.uid}`).valueChanges().subscribe(res=>{
    this.username =res['Username'];
    this.email =res['Email'];
}
  )
}

getData2(){
  this.itemDoc = this.afs.collection('userProfile').doc(`${firebase.auth().currentUser.uid}`).valueChanges().subscribe(res=>{
    this.dat =res['Courses'];
    var t =Object.keys(this.dat).length;
    console.log("my length"+ t)
    for (let y = 0; y < this.dat.length; y++) {
      this.courses[y] = this.dat[y];
      console.log(this.dat[y]);
    }
    
    console.log("keys"+ Object.keys(this.dat));
      return Object.keys(this.dat);
     
   // return this.dat;
    
  });

}
get key(){
  return Object.keys(this.dat);
}

editpic(){}





}
