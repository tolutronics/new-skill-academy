import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from '@ionic-native/device/ngx';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, AlertController} from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { FirebaseApp } from '@angular/fire';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
ischecked: any;
email: any;
Device: any;
password: any;
  constructor( public lc: LoadingController,  private fb:Facebook, private afs: AngularFirestore, private device: Device,
               private db: AngularFireDatabase, private alertCtrl: AlertController, private fire: AngularFireAuth,
               public router: Router, private store: NativeStorage) { }

               async Alert(msg, sub) {
                const alert = await this.alertCtrl.create({
                message: msg,
                subHeader: sub,
                buttons: ['OK']
               });
                await alert.present();
            }

            datachanged(e) {
              this.ischecked = e.currentTarget.checked;
              console.log(e);
              console.log(this.ischecked);
          }

               Login() {

                this.lc.create({
                  message: 'Signing you in',
                  duration: 4000
                }).then((resy) => {
                  resy.present();
                  this.fire.auth.signInWithEmailAndPassword(this.email, this.password)
                .then(data => {
                  console.log('Got data', this.fire.auth.currentUser);

                  if (this.fire.auth.currentUser.emailVerified) {

                  this.afs.collection('userProfile').doc(`${this.fire.auth.currentUser.uid}`).valueChanges().subscribe(res => {
                    resy.onDidDismiss().then((dis) => {
                      if (this.ischecked ) {
                        this.Device = this.device.uuid;
                        this.store.setItem('myitem', { device: this.Device, email: this.email})
                      .then(
                        () => console.log('Stored item!', ),
                        error => console.error('Error storing item', error)
                      );
                      }
                  });
                    if (res['Courses']) {
                    console.log(res['Courses']);
                    this.router.navigate(['/tabs']);
                  } else {
                         this.router.navigate(['/courselist']);
                    }
                });


                  } else {
                    resy.onDidDismiss().then((dis) => {
                    this.Alert('Please verify your account', 'info');
                    this.router.navigate(['/login']);
                  });
                }

                })
                .catch(error => {

                  resy.onDidDismiss().then((dis) => {
                  this.Alert('please check your internet connection and try again', 'failed');
                });
              });
              });



}

Signup(){
  this.router.navigate(['/signup']);
}
ngOnInit() {
}

async loginWithFB(){

  

  this.fb.login(['email'])
  .then((response: FacebookLoginResponse) => {
    this.onLoginSuccess(response);
    console.log(response.authResponse.accessToken);
  }).catch((error) => {
    console.log(error)
    alert('error:' + error)
  });
}
onLoginSuccess(res: FacebookLoginResponse) {
// const { token, secret } = res;
const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
firebase.auth().signInWithCredential(credential)
  .then((response) => {
    if (res['Courses']) {
      console.log(res['Courses']);
      this.router.navigate(['/tabs']);
    } else {
           this.router.navigate(['/courselist']);
      }
    this.lc.dismiss();
    
  })

}

onLoginError(err) {
console.log(err);
}
}