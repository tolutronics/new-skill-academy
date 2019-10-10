import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AngularFirestore } from '@angular/fire//firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-editprofile', 
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage {
  ref:any;
  username= {} as any;
  lastname= {} as any;
  firstname= {} as any;
  number= {} as any;
  email= {} as any;
  dev:any;
  info:any;
  itemDoc;
  mail:any;
  fname:any;
  lname:any;
  user:any;
  num:any;
  constructor( private router:Router, private store:NativeStorage,private afs: AngularFirestore,public navCtrl: NavController) {
    this.getData();
    //this.get();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

  saveEdit(){
    this.ref=this.afs.collection('userProfile').doc(`${firebase.auth().currentUser.uid}`)
    this.ref.update({
      Firstname:this.fname,
      Lastname:this.lname,
      Username:this.user,
      Number:this.num,
      Email:this.mail
    })
    this.router.navigate(['/tabs/tab4']);
  }

  back() {
    this.router.navigate(['/tabs/tab4']);
  }
  getData(){
    this.itemDoc = this.afs.doc(`/userProfile/${firebase.auth().currentUser.uid}`).valueChanges().subscribe(res=>{
     
      this.username =res['Username'];
      this.firstname =res['Firstname'];
      this.lastname =res['Lastname'];
      this.number =res['Number'];
      this.email =res['Email'];
  }
    )
  }
  


}
