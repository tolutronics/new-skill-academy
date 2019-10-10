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
constructor( private afs: AngularFirestore,public router:Router, public navCtrl: NavController,public activatedRoute : ActivatedRoute) {


    this.afs.doc(`/userProfile/${firebase.auth().currentUser.uid}`).valueChanges().subscribe(res=>{
    
      this.email =res['Email'];
  }
    );
  
  this.activatedRoute.queryParams.subscribe((res)=>{

    this.title = res['title'];
    this.amount =res['price'];
    this.class =res['class'];
    this.type=res['type'];
  });
}

//Callback function on successful payment 
paymentDone(ref: any) {
  console.log(ref) //ref contains the response from paystack after successful payment
  if (ref.message== "Approved" && ref.status=="success") {
    var q ={
      bought:'bought',
      
    }
    if (this.class=="beginner") {
      this.router.navigate(['/beginner-class'],
    {queryParams:q}
    );
    }
    else if(this.class=="advance"){
      this.router.navigate(['/advanced-class'],
      {queryParams:q}
      );
    }
    else if(this.class=="intermediate"){
      this.router.navigate(['/intermediate-class'],
      {queryParams:q}
      );
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