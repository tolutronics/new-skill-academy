import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SkillInterestsPage } from './skill-interests.page';

const routes: Routes = [
  {
    path: '',
    component: SkillInterestsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SkillInterestsPage]
})
export class SkillInterestsPageModule {}
