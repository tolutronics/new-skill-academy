import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page { 


  public checkresult:any;
  arrdata=[];
  value=[];
  ListCategory = [];
  temparrCat= [];
  //firedata2 = firebase.database().ref('DeviveID');
   
    name : any;
    
  
    constructor( private store:NativeStorage ,public navCtrl: NavController, private device:Device) {
      
  
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
  