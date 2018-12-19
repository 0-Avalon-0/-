import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitGuardService } from './services/init-guard/init-guard.service';
import { LoginComponent } from './pages/Login/login/login.component';
import{RegistComponent} from './pages/Login/regist/regist.component'
import { FileComponent } from './pages/main/right-control/file/file.component';
import { MenuComponent } from './pages/main/right-control/menu/menu.component';
import { CreateFileComponent } from './pages/main/right-control/create-file/create-file.component';
import { ProjectSettingComponent } from './pages/setting/project-setting.component';
const routes: Routes = [
  { path: 'setting' ,loadChildren: './pages/setting/setting.module#SettingModule', pathMatch: 'full' },
  { path: '', redirectTo: '/main/home', pathMatch: 'full'},
  { path:'projectconfigure/:pid',component:ProjectSettingComponent},
  { path: 'regist',  component: RegistComponent },
  { path: 'login',  component: LoginComponent },
  {path: 'file',component:FileComponent},
  {path :'menu',component:MenuComponent},
  {path:'create-file',component:CreateFileComponent },
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
