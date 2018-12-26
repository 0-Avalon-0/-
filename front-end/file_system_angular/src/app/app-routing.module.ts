import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/Login/login/login.component';
import{RegistComponent} from './pages/Login/regist/regist.component'
import { FileComponent } from './pages/main/right-control/file/file.component';
import { ProjectSettingComponent } from './pages/setting/project-setting.component';
const routes: Routes = [
  { path: '', redirectTo: '/main/home', pathMatch: 'full'},
  { path: 'setting', redirectTo: '/setting', pathMatch: 'full' },
  { path: 'regist',  component: RegistComponent },
  { path: 'login',  component: LoginComponent },
  {path: 'file',component:FileComponent},
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
