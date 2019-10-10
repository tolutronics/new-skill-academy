import { Component ,ViewChild} from '@angular/core';
import {  NavController,  AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Device } from '@ionic-native/device/ngx';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.page.html',
  styleUrls: ['./courselist.page.scss'],
})
export class CourselistPage {
  public cos:Array<string> = new Array(); 

  userData : any;
  aColor={} as any;
  email:string;
  name: string[] = [];
  selectedRow : Number;
  checkedItems={} as any;
 ref:any;
  data:any={};
 passed={} as any;
 corse={} as any;
 persons={} as any;
 setClickedRow : Function;
  courses = [
    {
     
      title: "Fashion Design",
      image: "1",
      isChecked:"",
    },
    {
      title: "Make Up",
      image: "2",
      isChecked:"",
    },
    {
      title: "Culinary Art",
      image: "3",
      isChecked:"",
    },
    {
      title: "Paper Craft",
      image: "4",
      isChecked:"",
    },
    {
      title: "Crystal Art",
      image: "5",
      isChecked:"",
    },
    {
      title: "Bead Making",
      image: "6",
      isChecked:"",
    },
    {
      title: "Fashion Illustration",
      image: "7",
      isChecked:"",
    },
    {
      title: "Hair Styling",
      image: "8",
      isChecked:"",
    },
    {
      title: "Hall Decoration",
      image: "9",
      isChecked:"",
    },
    {
      title: "Art Making",
      image: "10",
      isChecked:"",
    },
    {
      title: "Ankara Craft",
      image: "11",
      isChecked:"",
    },
    {
      title: "Fruit Craft",
      image: "12",
      isChecked:"",
    },
    {
      title: "Soap/Cream Making",
      image: "13",
      isChecked:"",
    },
    {
      title: "Aso-Oke Art",
      image: "14",
      isChecked:"",
    },
    {
      title: "Gele Art",
      image: "15",
      isChecked:"",
    },
    {
      title: "Baking",
      image: "16",
      isChecked:"",
    }



  ];

  cucumber: boolean;

  updateCucumber() {
    console.log('Cucumbers new state:' + this.cucumber);
  }
 model='';
 
  constructor( private router: Router, private afs: AngularFirestore,private device:Device, private fire: AngularFireAuth,public navCtrl: NavController, public alertCtrl:AlertController) {
    
     this.model = this.device.uuid;
    this.email= fire.auth.currentUser.email;
    console.log(this.name.values());

   
    
    
     
  }




  toCrystaldom(){

 
  
    
   
     
  this.router.navigate(['/tabs'])
     this.ref=this.afs.collection('userProfile').doc(`${firebase.auth().currentUser.uid}`)
    //  var courses = {};

     
    //  for (let j = 0; j < this.passed.length; j++) {

    //   courses[j] = this.passed[j].title;
        
    //  }
    this.ref.update({Courses:this.cos});

   
    //console.log(this.checkedItems);
  
  }

  datachanged(e:any,g:any){
    console.log(e);
    console.log(e.detail.checked);
    console.log(g);
    if(e.detail.checked){
      this.cos.push(g);
      console.log(this.cos);
    }else{
      let index: number = this.cos.indexOf(g);
      if (index > -1) {
        this.cos.splice(index, 1);
   }
   console.log(this.cos);
        }
}
 


  
 


  @ViewChild("checkbox", {static:true}) checkbox;
  ionViewDidLoad() {
  
    //  this.navCtrl.setRoot(CourselistPage);
   
  }
}

