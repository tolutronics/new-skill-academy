import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IntermediatechatPage } from './intermediatechat.page';

const routes: Routes = [
  {
    path: '',
    component: IntermediatechatPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IntermediatechatPage]
})
export class IntermediatechatPageModule {}
