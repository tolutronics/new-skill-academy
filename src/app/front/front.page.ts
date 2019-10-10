import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import * as firebase from 'firebase/app';
import 'firebase/firestore';


@Component({
  selector: 'app-front',
  templateUrl: './front.page.html',
  styleUrls: ['./front.page.scss'],
})
export class FrontPage { 


  public checkresult:any;
  arrdata=[];
  value=[];
  ListCategory = [];
  temparrCat= [];
  //firedata2 = firebase.database().ref('DeviveID');
   
    name : any;
    
  
    constructor( private store:NativeStorage,  private db: AngularFireDatabase ,public navCtrl: NavController, private device:Device) {
      
  
    }
  
    // save(){
    //    this.store.setItem('myitem',{name: 'Tolu', device: this.device.uuid, email:'unilorin'})
    // .then(
    //   () => console.log('Stored item!'),
    //   error => console.error('Error storing item', error)
    // );
    // }
  
   
  
  
    
  
    ionViewDidLoad() {
      
      this.store.setItem('myitem',{ email:firebase.auth().currentUser.email, device:this.device.uuid})
      .then(
        () => console.log('Stored item!', ),
        error => console.error('Error storing item', error)
      );
     
  
     
     
     
    }
  
  }
  