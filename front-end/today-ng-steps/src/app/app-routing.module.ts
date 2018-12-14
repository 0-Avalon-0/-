import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitGuardService } from './services/init-guard/init-guard.service';
import { LoginComponent } from './pages/Login/login/login.component';
import{RegistComponent} from './pages/Login/regist/regist.component'
import {AllprojectComponent} from './pages/main/right-control/allproject/allproject.component'
import { MenuComponent } from 'npm/FileManagingSystem/front-end/today-ng-steps/src/app/pages/menu/menu.component';
const routes: Routes = [
  { path: 'summary', redirectTo: '/summary', pathMatch: 'full' },
  { path: 'setting', redirectTo: '/setting', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'regist',  component: RegistComponent },
  { path: 'menu/:file_fname', component: MenuComponent },
  { path: '' ,redirectTo:'/main',pathMatch: 'full'}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
