import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AngularFirestore } from '@angular/fire//firestore';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage} from '@angular/fire/storage';
import 'firebase/firestore';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-editprofile', 
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage {
  ref:any;
  username= {} as any;
  lastname= {} as any;
  firstname= {} as any;
  number= {} as any;
  email= {} as any;
  dev:any;
  info:any;
  itemDoc;
  mail:any;
  fname:any;
  lname:any;
  photourl:any;
  photo2:any;
  photos: any;
  user:any;
  num:any;
  image:any;
  PhotoUrl:any;
  constructor( public db: AngularFireDatabase,public storage: AngularFireStorage, public camera: Camera, private router:Router, private store:NativeStorage,private afs: AngularFirestore,public navCtrl: NavController) {
    this.getData();
    //this.get();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

  saveEdit(){
    this.ref=this.afs.collection('userProfile').doc(`${firebase.auth().currentUser.uid}`)
    this.ref.update({
      Firstname:this.fname,
      Lastname:this.lname,
      Username:this.user,
      Number:this.num,
      Email:this.mail,
      Photo:this.PhotoUrl
    })
    this.router.navigateByUrl('/tabs/tab4');
  }

  back() {
    this.router.navigate(['/tabs/tab4']);
  }
  getData(){
    this.itemDoc = this.afs.doc(`/userProfile/${firebase.auth().currentUser.uid}`).valueChanges().subscribe(res=>{
     
      this.username =res['Username'];
      this.firstname =res['Firstname'];
      this.lastname =res['Lastname'];
      this.number =res['Number'];
      this.email =res['Email'];
      this.PhotoUrl= res['Photo'];
  }
    )
  }


  changepix(){
    this.camera.getPicture({
   
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      targetWidth:200,
      targetHeight:200,
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      allowEdit:true,
     }).then((imageData) => {
       
       var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz?&%$#@";
       var string_length = 16;
       var randomstring = '';
       for (var i=0; i<string_length; i++) {
         var rnum = Math.floor(Math.random() * chars.length);
         randomstring += chars.substring(rnum,rnum+1);
       } 
  
       this.photourl = 'data:image/jpeg;base64,'+imageData;
      this.storage.ref('pictures/'+randomstring).putString(this.photourl,'data_url');
      this.ref=this.afs.collection('userProfile').doc(`${firebase.auth().currentUser.uid}`)
      this.ref.update({
        Firstname:this.fname,
        Lastname:this.lname,
        Username:this.user,
        Number:this.num,
        Email:this.mail,
        Photo:this.photourl
      });
    
          }, (err) => {
  
       console.log(err);
  
     });
  
  }



  


}
