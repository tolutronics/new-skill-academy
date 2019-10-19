import { Component, OnInit, ViewChild } from '@angular/core';
import { Rave, RavePayment, Misc } from 'rave-ionic4';
import { NavController, AlertController, LoadingController, Platform } from '@ionic/angular';
import { ViewController } from '@ionic/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage {

public formPay : FormGroup;
public public_key = 'pk_test_15902d8d7ebdff253d60cf017703fa9d1a52b6f9'; //Put your paystack Test or Live Key here
public channels = ['card']; //Paystack Payment Methods
public random_id = Math.floor(Date.now() / 1000); //Line to generate reference number
email;
amount;
title;
class;
type;
index;
ref;
public arr:Array<string> = new Array(); 
constructor( private afs: AngularFirestore,public router:Router, public navCtrl: NavController,public activatedRoute : ActivatedRoute) {


    this.afs.doc(`/userProfile/${firebase.auth().currentUser.uid}`).valueChanges().subscribe(res=>{
    
      this.email =res['Email'];
  }
    );

     this.afs.collection('Subscriptions').doc(`${firebase.auth().currentUser.uid}`).valueChanges().subscribe(res=>{
      this.arr =res['Sic'];
      var t =Object.keys(this.arr).length;
      console.log("my length"+ t)
      for (let y = 0; y < this.arr.length; y++) {
     
        console.log(this.arr[y]);
      }
      })
  
  this.activatedRoute.queryParams.subscribe((res)=>{

    this.title = res['title'];
    this.amount =res['price'];
    this.class =res['class'];
   console.log (this.type=res['type']);
    this.index=res['index'];
  });
}

//Callback function on successful payment 
paymentDone(ref: any) {
  console.log(ref) //ref contains the response from paystack after successful payment
  if (ref.message== "Approved" && ref.status=="success") {
    var q ={
      bought:'bought',
      
    }
    if (this.class=="beginner" && this.type=="All-access") {
      this.ref=this.afs.collection('Subscriptions').doc(`${firebase.auth().currentUser.uid}`)
      this.ref.update({
        Allaccess:'true',
      });
      this.router.navigate(['/beginner-class']);
    }
    else if(this.class=="advance"&& this.type=="All-access"){
      this.ref=this.afs.collection('Subscriptions').doc(`${firebase.auth().currentUser.uid}`)
      this.ref.update({
        Allaccess:'true',
      });
      this.router.navigate(['/advanced-class']);
    }
    else if(this.class=="intermediate"&& this.type=="All-access"){
      this.ref=this.afs.collection('Subscriptions').doc(`${firebase.auth().currentUser.uid}`)
      this.ref.update({
        Allaccess:'true',
      });
      this.router.navigate(['/intermediate-class']);
    }

    if (this.class=="beginner" && this.type=="Single") {
      this.ref=this.afs.collection('Subscriptions').doc(`${firebase.auth().currentUser.uid}`)
      this.ref.update({
        BeginnerClass:'true',
      });
      this.router.navigate(['/beginner-class']);
    }
    else if(this.class=="advance"&& this.type=="Single"){
      this.ref=this.afs.collection('Subscriptions').doc(`${firebase.auth().currentUser.uid}`)
      this.ref.update({
        IntermediateClass:'true',
      });
      this.router.navigate(['/advanced-class']);
    }
    else if(this.class=="intermediate"&& this.type=="Single"){
      this.ref=this.afs.collection('Subscriptions').doc(`${firebase.auth().currentUser.uid}`)
      this.ref.update({
        AdvancedClass:'true',
      });
      this.router.navigate(['/intermediate-class']);
    }
    else if(this.class=="intermediate"&& this.type=="sicc"){
      this.arr.push(this.index)
      this.ref=this.afs.collection('Subscriptions').doc(`${firebase.auth().currentUser.uid}`)
      this.ref.update({
        Sic:this.arr,
      });
      this.router.navigate(['/intermediate-class']);
    }
 
    
    
  }
}

//Event triggered if User cancel the payment
paymentCancel() {
  console.log('gateway closed')
}

cancel()
{
   if (this.class=="beginner") {
  this.router.navigate(['/beginner-class'])
}
else if(this.class=="advance"){
  this.router.navigate(['/advanced-class'])
}
else if(this.class=="intermediate"){
  this.router.navigate(['/intermediate-class']);
}
}

}