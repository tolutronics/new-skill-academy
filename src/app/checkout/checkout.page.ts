import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage {
title;
class;
  dummyText: string = `Type a longer text to see how this expands!`;


  constructor( public navCtrl: NavController,  private afs: AngularFirestore, public activatedRoute:ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((res)=>{

      this.title = res['title'];
      this.class =res['class'];
    });
  }
   
  
    
}