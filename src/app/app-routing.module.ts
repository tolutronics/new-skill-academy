import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'editprofile', loadChildren: './editprofile/editprofile.module#EditprofilePageModule' },
  { path: 'forum', loadChildren: './forum/forum.module#ForumPageModule' },
  { path: 'front', loadChildren: './front/front.module#FrontPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'intermediate-class', loadChildren: './intermediate-class/intermediate-class.module#IntermediateClassPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'main', loadChildren: './main/main.module#MainPageModule' },
  { path: 'recover', loadChildren: './recover/recover.module#RecoverPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'signin', loadChildren: './signin/signin.module#SigninPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'skill-interests', loadChildren: './skill-interests/skill-interests.module#SkillInterestsPageModule' },
  { path: 'chatpage', loadChildren: './chatpage/chatpage.module#ChatpagePageModule' },
  { path: 'classes', loadChildren: './classes/classes.module#ClassesPageModule' },
  { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
  { path: 'courselist', loadChildren: './courselist/courselist.module#CourselistPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'addnewcourse', loadChildren: './addnewcourse/addnewcourse.module#AddnewcoursePageModule' },
  { path: 'advanced-class', loadChildren: './advanced-class/advanced-class.module#AdvancedClassPageModule' },
  { path: 'beginner-class', loadChildren: './beginner-class/beginner-class.module#BeginnerClassPageModule' },
  { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutPageModule' },
  { path: 'beginnerchat', loadChildren: './beginnerchat/beginnerchat.module#BeginnerchatPageModule' },
  { path: 'advancechat', loadChildren: './advancechat/advancechat.module#AdvancechatPageModule' },
  { path: 'intermediatechat', loadChildren: './intermediatechat/intermediatechat.module#IntermediatechatPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
