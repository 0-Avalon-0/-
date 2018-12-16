import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

// modules
import { AppRoutingModule } from './app-routing.module';
import { MainModule } from './pages/main/main.module';

// services
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { ListService } from './services/list/list.service';
import { InitGuardService } from './services/init-guard/init-guard.service';
import { SettingModule } from './pages/setting/setting.module';
import { LoginComponent } from './pages/Login/login/login.component';
import { RegistComponent } from './pages/Login/regist/regist.component';
import { RouterModule } from '@angular/router'
import { ApiService } from './services/api.service';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,
    MainModule,
    RouterModule,
    SettingModule,
    FormsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'zh-Hans' },
    { provide: NZ_I18N, useValue: zh_CN },
    LocalStorageService,
    ListService,
    ApiService,
    InitGuardService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
