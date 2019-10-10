import { Component,ViewChild } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage {
  email:any;
  constructor(private router:Router, private fire:AngularFireAuth,public navCtrl: NavController,  private alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecoverPage');
  }

  async alert(message:string){
    const alert =await this.alertCtrl.create({
      header: 'Info!',
      message: message,
      buttons: ['OK']
    })
    alert.present();
  }

  sendReMAIL(){
    this.fire.auth.sendPasswordResetEmail(this.email)
    .then(() => {
    if (this.fire.auth.sendPasswordResetEmail) {
      this.alert("Success, Email Sent, Check your mail and sign in again");
      this.router.navigate(['login']);
        
      
    }else{
      this.alert("Oops! , Email not Sent");
    }
    
      })

  }
  toLogin(){
    this.router.navigate(['/login']);
  }
  back() {
    this.router.navigate(['/login']);
  }
  
}
