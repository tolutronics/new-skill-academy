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
userData: any;
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
          recover(){
            this.router.navigate(['/recover']);
          }
               Login() {

                this.lc.create({
                  message: 'Signing you in',
                  duration: 2000
                }).then((resy) => {
                  resy.present();
                  this.fire.auth.signInWithEmailAndPassword(this.email, this.password)
                .then(data => {
                  console.log('Got data', this.fire.auth.currentUser);

                  if (this.fire.auth.currentUser.emailVerified) {
                    if (this.ischecked ) {
                      console.log('checked o')
                      this.Device = this.device.uuid;
                      this.store.setItem('myitem', { device: this.Device, token: firebase.auth().currentUser.getIdToken})
                    .then(
                      (res) => console.log('Stored item!', ),
                      error => console.error('Error storing item', error)
                    );
                    }

                  this.afs.collection('userProfile').doc(`${this.fire.auth.currentUser.uid}`).valueChanges().subscribe(res => {
                    resy.onDidDismiss().then((dis) => {
                     
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
                    console.log(error)
                  this.Alert(error.message, error.code);
                });
              });
              });



}

Signup(){
  this.router.navigate(['/signup']);
}
ngOnInit() {
}

// async loginWithFB(){

  

//   this.fb.login(['email'])
//   .then((response: FacebookLoginResponse) => {
//     this.onLoginSuccess(response);
//     console.log(response.authResponse.accessToken);
//   }).catch((error) => {
//     console.log(error)
//     alert('error:' + error)
//   });
// }
// onLoginSuccess(res: FacebookLoginResponse) {
// // const { token, secret } = res;
// const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
// firebase.auth().signInWithCredential(credential)
//   .then((response) => {
//     if (res['Courses']) {
//       console.log(res['Courses']);
//       this.router.navigate(['/tabs']);
//     } else {
//            this.router.navigate(['/courselist']);
//       }
//     this.lc.dismiss();
    
//   })

// }

// onLoginError(err) {
// console.log(err);
// }

async loginWithFB(){
    this.fb.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
  console.log('first stage');
      this.fb.api('me?fields=id,name,email,first_name,last_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        console.log('second stage');
        this.userData = {email: profile['email'], first_name: profile['first_name'], last_name: profile['last_name'],picture: profile['picture_large']['data']['url'], username: profile['name']}
     console.log(this.userData);

      const credential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
      firebase.auth().signInWithCredential(credential).then((response) => {
     

      
      

     this.afs.doc(`/userProfile/${response.user.uid}`).valueChanges().subscribe(res=>{

      if (!res) {
        firebase.firestore().doc(`/userProfile/${response.user.uid}`).set({
          Username:this.userData.username,
          Firstname:this.userData.first_name,
          Lastname:this.userData.last_name,
          Number:'', 
          Email:this.userData.email,
          Password:'',
          Photo:this.userData.picture,
          uid:response.user.uid
          
       });
      
       firebase.firestore().doc(`/Subscriptions/${response.user.uid}`).set({
        BeginnerClass:'false',
        IntermediateClass:'false',
        AdvancedClass:'false',
        Allaccess:'false',  
        Sbc:'',
        Sic:'',
        Sac:'',
      
        
        
      });
      
      this.router.navigate(['/courselist']);
       
      
        
      }else{
        this.router.navigate(['/tabs/tab1']);
      }


     })

        
           
          
          } ).catch((error)=>{
            console.log('first',error);
          });

    

  });
}


).catch((error)=>{
  console.log('second', error)
});
  }
}
