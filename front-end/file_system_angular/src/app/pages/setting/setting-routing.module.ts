import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting.component';
import { InitGuardService } from '../../services/init-guard/init-guard.service';
import { ProjectSettingComponent } from './project-setting.component';

const routes: Routes = [
  {
    path: 'setting',
    component: SettingComponent
  },
  { path:'projectconfigure/:pid',component:ProjectSettingComponent},
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SettingRoutingModule { }
