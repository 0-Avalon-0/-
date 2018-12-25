import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/Login/login/login.component';
import{RegistComponent} from './pages/Login/regist/regist.component'
import { FileComponent } from './pages/main/right-control/file/file.component';
import { ProjectSettingComponent } from './pages/setting/project-setting.component';
const routes: Routes = [
  { path: 'setting' ,loadChildren: './pages/setting/setting.module#SettingModule', pathMatch: 'full' },
  { path: '', redirectTo: '/main/home', pathMatch: 'full'},
  { path:'projectconfigure/:pid',component:ProjectSettingComponent},
  { path: 'regist',  component: RegistComponent ,pathMatch: 'full'},
  { path: 'login',  component: LoginComponent,pathMatch: 'full' },
  {path: 'file',component:FileComponent},
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
