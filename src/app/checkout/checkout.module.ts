import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {AutosizeModule} from 'ngx-autosize'
import { IonicModule } from '@ionic/angular';

import { CheckoutPage } from './checkout.page';

const routes: Routes = [
  {
    path: '',
    component: CheckoutPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AutosizeModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CheckoutPage]
})
export class CheckoutPageModule {}
