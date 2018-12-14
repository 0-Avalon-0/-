import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitGuardService } from './services/init-guard/init-guard.service';
import { LoginComponent } from './pages/Login/login/login.component';
import{RegistComponent} from './pages/Login/regist/regist.component'
import {AllprojectComponent} from './pages/main/right-control/allproject/allproject.component'
import { FileComponent } from './pages/main/right-control/file/file.component';
import { MenuComponent } from './pages/main/right-control/menu/menu.component';
const routes: Routes = [
  { path: 'summary', redirectTo: '/summary', pathMatch: 'full' },
  { path: 'setting', redirectTo: '/setting', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'regist',  component: RegistComponent },
  { path: '' ,redirectTo:'/main',pathMatch: 'full'},
  {path: 'file',component:FileComponent},
  {path :'menu',component:MenuComponent},
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
