import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SettingComponent } from './setting.component';
import { SettingRoutingModule } from './setting-routing.module';
import { FormsModule } from '@angular/forms';
import { ProjectSettingComponent } from './project-setting.component';

@NgModule({
  imports: [
    CommonModule,
    SettingRoutingModule,
    NgZorroAntdModule,
    FormsModule
  ],
  declarations: [ SettingComponent,ProjectSettingComponent ]
})
export class SettingModule { }
