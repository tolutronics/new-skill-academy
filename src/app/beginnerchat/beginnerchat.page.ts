import { Component } from '@angular/core';
import { NavController, AlertController,  ActionSheetController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Camera } from '@ionic-native/camera/ngx';
import { FirebaseApp } from '@angular/fire';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beginnerchat',
  templateUrl: './beginnerchat.page.html',
  styleUrls: ['./beginnerchat.page.scss'],
})
export class BeginnerchatPage  {
  username={} as any;
  message:any="";
  key:any;
  time:any;
  public myData;
  day:any;
  photourl:any;
  photo2:any;
  photos: any;
messages = [] as any;
 // messages: AngularFireList<any[]>;
  s;
  // value: FirebaseListObservable<any[]>;
  keypath:any;
  topic:any;
  image:any;
  PhotoUrl:any;
  msg:AngularFireList<any>;
date;
hours;
minutes;

  item;
  itemDoc;
  toggled: boolean = false;

  constructor(public activatedRoute : ActivatedRoute, public actionSheetCtrl: ActionSheetController, public storage: AngularFireStorage, public camera: Camera, public navCtrl: NavController, public firebaseNative:FirebaseApp, public db: AngularFireDatabase, private afs: AngularFirestore,public alertCtrl: AlertController) {
 
   
   

  
  this.getData();
  this.getMsg();
  

  
  }

  handleSelection(event){

  this.message += event.char;

  }
  

 
  async presentActionSheet(pos) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Albums',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {

        }
      }, {
        text: 'Copy',
        icon: 'copy',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }




 
  getMsg(){
    // this.activatedRoute.params.subscribe(extras => {
    //   this.topic= extras.chattopic;

    // this.db.list('/chatTopic', ref => ref.orderByChild('topic').equalTo(this.topic)).snapshotChanges()
    // .subscribe(actions => {
    //   actions.forEach((action,) => {
    //     this.keypath=action.key;});

    this.db.list('/beginnerchat').valueChanges()
    .subscribe((datas) => {
       console.log("datas", datas) ;
       this.messages=datas;
      });




  }
         
    


getData(){
  this.itemDoc = this.afs.doc(`/userProfile/${firebase.auth().currentUser.uid}`).valueChanges().subscribe(res=>{
    this.username =res['Username'];
    
   
}
  )
}


 
  sendMessage(){
    var today = new Date();
    this.day=  today.getDay();
    this.hours = today.getHours();
  this.minutes = today.getMinutes();
  var ampm = this.hours >= 12 ? 'pm' : 'am';
  this.hours = this.hours % 12;
  this.hours = this.hours ? this.hours : 12; // the hour '0' should be '12'
  this.minutes = this.minutes < 10 ? '0'+this.minutes : this.minutes;
  this.time = this.hours + ':' + this.minutes + ' ' + ampm;
     
    
    // this.db.list('/chatTopic', ref => ref.orderByChild('topic').equalTo(this.topic)).snapshotChanges()
    // .subscribe(actions => {
    //     actions.forEach((action,) => {
    //       this.keypath=action.key;
    //       console.log("keypath"+ this.keypath);
          this.db.list(`/beginnerchat`).push({
            message: this.message,
            time:this.time,
            username:this.username,
          }).then(() => {
            this.message= " ";
         }, (error) => {
           console.log(error);
          
         })
 
   
    // }else{
    //   //#
    // }
  }

  AccessCamera(){

    this.camera.getPicture({
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth:200,
      targetHeight:200,
      correctOrientation:true,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum:false,
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
        // this.db.list('/chatTopic', ref => ref.orderByChild('topic').equalTo(this.topic)).snapshotChanges()
        // .subscribe(actions => {
        //     actions.forEach((action,) => {
        //       this.keypath=action.key;
        this.db.list('/beginnerchat').push({
         // PhhotoName: randomstring,
          photourl:this.photourl,
          username:this.username,
        }).then(()=>{})
        .then(()=>{});

      });
      
        
   

   
   }
   
   AccessGallery(){
   
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
      //  this.db.list('/chatTopic', ref => ref.orderByChild('topic').equalTo(this.topic)).snapshotChanges()
      //  .subscribe(actions => {
      //      actions.forEach((action,) => {
      //       this.keypath=action.key;
       this.db.list('/beginnerchat').push({
        //PhhotoName: randomstring,
        photourl:this.photourl,
        username:this.username,
        key:this.keypath
      }).then(()=>{

        
   
      }).then(()=>{
  
      });
      });
 
   
   }
   getPhoto(){
    this.s=this.db.list('/photo').valueChanges().subscribe(data =>{
     
      console.log(data);
      this.photos = data;
    });

  }

  

  ionViewDidLoad() {
    
   
    console.log(this.message);
  }

}