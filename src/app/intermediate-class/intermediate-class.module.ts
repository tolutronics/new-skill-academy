import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IntermediateClassPage } from './intermediate-class.page';

const routes: Routes = [
  {
    path: '',
    component: IntermediateClassPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IntermediateClassPage]
})
export class IntermediateClassPageModule {}
