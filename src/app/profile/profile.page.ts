
//import { Facebook } from '@ionic-native/facebook/ngx';
import { Component,ViewChild } from '@angular/core';
import { NavController,  IonSlides} from '@ionic/angular';
// import { Http, Headers } from '@angular/http'; 
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  //firedata2 = this.afd.database().ref('/User');
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
    console.log(this.dat)
    for (let y = 0; y < this.dat.length; y++) {
      this.courses[y] = this.dat[y];
      console.log(this.dat[y]);
    }
    
    console.log("keys"+ Object.keys(this.dat));
    console.log("values"+ (Object.keys(this.dat)).values());
      return Object.keys(this.dat);
      
   // return this.dat;
    
  });

}
get key(){
  return Object.keys(this.dat);
}







}
