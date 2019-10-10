import { Component } from '@angular/core';
import { ActionSheetController,  AlertController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage} from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FirebaseApp } from '@angular/fire';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  username={} as any;
  navData;
  message:any;
  photourl:any;
  photo2:any;
  photos: any;
  topic:any;
  head:any;
  topics=[] as any;
  reversed=[] as any;
  s;
  image:any;
  PhotoUrl:any;
  msg:AngularFireList<any>;
date;
hours;
minutes;

  item;
  itemDoc;

  constructor(private router:Router,public actionSheetCtrl: ActionSheetController, public storage: AngularFireStorage, public camera: Camera ,public firebaseNative:FirebaseApp, public db: AngularFireDatabase, private afs: AngularFirestore,public alertCtrl: AlertController) {

  this.getData();
  this.getMsg();


  }

  delete(){
  
  }
 
  async addTopic() {
    const prompt = await this.alertCtrl.create({
      header: 'NEW TOPIC',
      message: "start a new topic here",
      inputs: [
        {
          name: 'TOPIC',
          placeholder: 'Your topic'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Create',
          handler: data => {
             this.topic=data.TOPIC,
            this.db.list('/chatTopic').push({
             
              topic: this.topic,
              username:this.username,
            }).then(()=>{
        
            })
          }
        }
      ]
    });
    prompt.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Albums',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
         this.delete();
        


        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'arrow-dropright-circle',
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


  chatPage(title){
   this.head=title;
    this.router.navigate(['/chatpage', this.navData={
      chattopic: this.head.topic,
      username:this.username
  }]);
  }
 
 
  getMsg(){
    this.s=this.db.list('/chatTopic').valueChanges().subscribe(data =>{ 
     
      console.log(data);
      this.topics = data;
      this.reversed = this.topics.slice().reverse();
    });
  }

getData(){
  this.itemDoc = this.afs.doc(`/userProfile/${firebase.auth().currentUser.uid}`).valueChanges().subscribe(res=>{
  this.username =res['Username'];
   
}
  )
}


 
  sendMessage(){
    console.log('sent')
    this.db.list('/chat').push({
      message: this.message,
      username:this.username,
    }).then(()=>{

    })
  }

  AccessCamera(){

    this.camera.getPicture({
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth:512,
      targetHeight:512,
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

        this.db.list('/chat').push({
         // PhhotoName: randomstring,
          photourl:this.photourl,
          username:this.username
        }).then(()=>{

         
    
        }).then(()=>{
    
    
        });

       

            }, (err) => {
   
        console.log(err);
   
      });

   
   }
   
   AccessGallery(){
   
    this.camera.getPicture({
   
       sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
       targetWidth:512,
       targetHeight:512,
       quality: 75,
       destinationType: this.camera.DestinationType.DATA_URL
   
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
       this.db.list('/chat').push({
        //PhhotoName: randomstring,
        photourl:this.photourl,
        username:this.username
      }).then(()=>{

        
  
      }).then(()=>{
  
  
      });
   
           }, (err) => {
   
        console.log(err);
   
      });
   
   }
   getPhoto(){
    this.s=this.db.list('/photo').valueChanges().subscribe(data =>{
     
      console.log(data);
      this.photos = data;
    });

  }

  

  ionViewDidLoad() {
    
   
    console.log('ionViewDidLoad ForumPage');
  }

}
