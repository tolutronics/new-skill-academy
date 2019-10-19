  
import { Component, ViewChildren, QueryList } from '@angular/core';

import { Platform, NavController, IonRouterOutlet, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Device } from '@ionic-native/device/ngx';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { PassageService } from './passage.service';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  info = '';
  pass: any;
  userid;
  email;
  lastTimeBackPress = 0;
timePeriodToExit = 2000;
@ViewChildren(IonRouterOutlet) routerOutlets: QueryList < IonRouterOutlet > ;
  constructor(
    private fire: AngularFireAuth,
    private platform: Platform,
    private navController: NavController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: NativeStorage,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    private device: Device,
    public router: Router,
    private ps: PassageService,
    private afs: AngularFirestore,
  ) {
    this.initializeApp();
  }  

  initializeApp() {
    this.platform.ready().then(() => {
          

      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
      this.store.getItem('myitem')
      .then(
      data => {
        this.email = data.email,
        this.userid=data.userid,
         this.pass  = data.pass,
         this.info = data.device;
         
         if (this.info != this.device.uuid) {
           console.log('not equal')
          this.navController.navigateRoot(['login']);
          this.statusBar.styleBlackTranslucent();
          this.splashScreen.hide();
         
      

         } else {
          console.log('my info')
          console.log(this.pass)
         console.log(this.email)
          this.ps.setDestn(this.email);
          this.ps.setDestn2('keeped');
          this.fire.auth.signInWithEmailAndPassword(this.email,this.pass).then(()=>{
            this.navController.navigateRoot(['tabs/tab1'], { skipLocationChange: true });
            this.afs.doc(`/Devices/${this.userid}`).set({ 
              info: this.info
            });
          })

         }
    } ,

      error =>  this.navController.navigateRoot(['login'])
         );
      console.log(this.info);

    });
  }

  backButtonEvent() {
    
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.routerOutlets.forEach(async(outlet: IonRouterOutlet) => {
        if ((this.router.url==='/tabs/tab2') || (this.router.url==='/tabs/tab3') || (this.router.url==='/tabs/tab4')){
        await this.router.navigate(['/tabs/tab1']);
        }
        else if (this.router.url === '/tabs/tab1') {
          if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
            this.lastTimeBackPress = new Date().getTime();
            this.presentAlertConfirm();
          } else {
            navigator['app'].exitApp();
          }
        }
      });
    });
  }
  
  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      // header: 'Confirm!',
      message: 'Are you sure you want to exit the app?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {}
      }, {
        text: 'Close App',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });
  
    await alert.present();
  }
}                     