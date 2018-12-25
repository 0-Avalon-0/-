import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitGuardService } from './services/init-guard/init-guard.service';
import { LoginComponent } from './pages/Login/login/login.component';
import{RegistComponent} from './pages/Login/regist/regist.component'
import { FileComponent } from './pages/main/right-control/file/file.component';
import { CreateFolderComponent } from './pages/main/right-control/create-folder/create-folder.component';
import { CreateFileComponent } from './pages/main/right-control/create-file/create-file.component';
import { ProjectSettingComponent } from './pages/setting/project-setting.component';
const routes: Routes = [
  { path: '', redirectTo: '/main/home', pathMatch: 'full'},
  { path: 'setting', redirectTo: '/setting', pathMatch: 'full' },
  { path: 'regist',  component: RegistComponent },
  { path: 'login',  component: LoginComponent },
  {path: 'file',component:FileComponent},
  {path:'create-file',component:CreateFileComponent },
  {path:'create-folder',component:CreateFolderComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
