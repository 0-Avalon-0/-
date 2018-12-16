import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitGuardService } from './services/init-guard/init-guard.service';
import { LoginComponent } from './pages/Login/login/login.component';
import{RegistComponent} from './pages/Login/regist/regist.component'
import { FileComponent } from './pages/main/right-control/file/file.component';
import { MenuComponent } from './pages/main/right-control/menu/menu.component';
import { CreateFileComponent } from './pages/main/right-control/create-file/create-file.component';
const routes: Routes = [
  { path: 'summary', redirectTo: '/summary', pathMatch: 'full' },
  { path: 'setting', redirectTo: '/setting', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'regist',  component: RegistComponent },
  { path: '' ,redirectTo:'/main/home',pathMatch: 'full'},
  {path: 'file',component:FileComponent},
  {path :'menu',component:MenuComponent},
  {path:'create-file',component:CreateFileComponent },
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
