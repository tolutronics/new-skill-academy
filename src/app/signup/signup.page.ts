//import { database } from 'firebase';
import { Component ,ViewChild} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Device } from '@ionic-native/device/ngx';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  
  name:any;
  arrData=[];
    email:any;
     password:any;
     fname:any;
   lname:any;
  username:any;
  number:any;
     
  
    constructor(
      private device:Device,
      private router: Router,
      private store:NativeStorage,
      private alertCtrl:AlertController,
      private fire: AngularFireAuth,
      public navCtrl: NavController) {}
  
    async alert(message:string){
      const alert = await this.alertCtrl.create({
        header: 'Info!',
        message: message,
        buttons: ['OK']
      })
      alert.present();
    }
  
    registerUser(){
      
      this.fire.auth.createUserWithEmailAndPassword(this.email, this.password)
        .then((newUserCredential: firebase.auth.UserCredential) => {
                firebase.firestore().doc(`/userProfile/${newUserCredential.user.uid}`).set({
                   Username:this.username,
                   Firstname:this.fname,
                   Lastname:this.lname,
                   Number:this.number, 
                   Email:this.email,
                   Password:this.password,
                   
                   
                });
       
      
        
            this.fire.auth.currentUser.sendEmailVerification();
            this.alert("Registered...Please go to your Email to activate account");
            this.router.navigate(['/login']);
          
        })
        .catch(error =>{
          console.log('Got errror', error);
          this.alert(error.message);
        });
    }
  
    login(){
      this.router.navigate(['/login']);
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad SignupPage');
      
    }
  
   
  
  }
  