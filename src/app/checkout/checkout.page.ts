import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage {

toast;
  cardNumber: string;
  cardMonth: number;
  cardYear: number;
  cardCVV: string;
  price;
  chargeAmount;
  lname:any;
  fname:any;


  constructor( public navCtrl: NavController,  private afs: AngularFirestore) {
  
    this.ionViewDidLoad();
    this.getData1();
  }

  ngOnInit(){

 

    this.price= 100;
    this.chargeAmount = this.price*100;
    }
    getData1(){
        this.afs.doc(`/userProfile/${firebase.auth().currentUser.uid}`).valueChanges().subscribe(res=>{
        this.fname =res['Firstname'];
        this.lname =res['Lastname'];
    }
      )
    }

    ionViewDidLoad() {
      
    }

  validateCard(){
    
}
}