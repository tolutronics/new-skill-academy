// import { Firebase } from '@ionic-native/firebase/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorage} from '@angular/fire/storage';
import { AngularFireStorageModule} from '@angular/fire/storage';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Rave, RavePayment, Misc } from 'rave-ionic4';
import { HttpClient, HttpHandler } from '@angular/common/http';
import * as firebase from 'firebase';
firebase.initializeApp(environment.firebase);
@NgModule({
  
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,  IonicModule.forRoot(), AppRoutingModule,FormsModule,AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,AngularFireStorageModule],
  providers: [
    StatusBar,
    AngularFireDatabase,
    HttpClient,
    AngularFireStorage,
    RavePayment,
    Misc,
    Rave,
    AngularFireAuth,
    SplashScreen,
    //Firebase,
    Facebook,
    Camera,
    NativeStorage,
   Device,
   

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {}
