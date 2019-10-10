import * as firebase from 'firebase/app';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Device } from '@ionic-native/device/ngx';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import 'firebase/firestore';
@Component({
  selector: 'app-addnewcourse',
  templateUrl: './addnewcourse.page.html',
  styleUrls: ['./addnewcourse.page.scss'],
})
export class AddnewcoursePage {
  ref:any;
  data:any={};
 passed={} as any;
 corse={} as any;
 persons={} as any;
 dat={} as any;
 itemDoc;
 public cos:Array<string> = new Array(); 
 datlength;

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


  constructor(private afs: AngularFirestore,private device:Device, private router:Router,public navCtrl: NavController, public alertCtrl:AlertController) {
 
 
      this.itemDoc = this.afs.collection('userProfile').doc(`${firebase.auth().currentUser.uid}`).valueChanges().subscribe(res=>{
        this.dat =res['Courses'];
        var t =Object.keys(this.dat).length;
        console.log("my length"+ t)
        for (let y = 0; y < this.dat.length; y++) {
          this.courses[y] = this.dat[y];
          console.log(this.dat[y]);
        }
        })
      
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddnewcoursePage');
  }

  async alert(message) {
    const alert = await this.alertCtrl.create({
    message: message,
    buttons: [
      {
        text: 'ok',
        role: 'done',
       
      }]
   });
    await alert.present();
}



back() {
  this.router.navigate(['/tabs/tab4']);
}


 addNewCourses(){

   
    
   this.alert("Courses added successfully")
     
    this.router.navigate(['/profile']);
 
     this.ref=this.afs.collection('userProfile').doc(`${firebase.auth().currentUser.uid}`)
   

    this.ref.update({Courses:this.cos});

   
    //console.log(this.checkedItems);
  
  }

  toProfile(){
    this.router.navigate(['/profile']);
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

}
