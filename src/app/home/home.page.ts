
import { Component } from '@angular/core';
import { ToastController,NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  slides = [
    {
      title: "Welcome!",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      image: "assets/imgs/slide1.png",
      
    },
    {
      title: "Hassle-free Learning",
      description: "No travelling to classes at inconvienient locations at inconvenient time. Learn 24/7 anytime you want.",
      image: "assets/imgs/slide2.png",
    },
    {
      title: "Clear and Understandable Demonstrations",
      description: "Our video lessons explin how to do everything yourself, step-by-step. Download lessons for no extra charge",
      image: "assets/imgs/slide3.png",
    }
  ];

  constructor(private router:Router, public navCtrl: NavController,public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
  }
    
  

  
  skip(){
    this.router.navigate(['/signup'])
  }
}
