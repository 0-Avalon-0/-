import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { LeftControlComponent } from './left-control/left-control.component';
import { ListComponent } from './left-control/list/list.component';
import { HeaderComponent } from './right-control/header/header.component';
import { SuggestComponent } from './right-control/header/suggest/suggest.component';
import { HomeComponent } from './right-control/home/home.component';
import { AllprojectComponent } from './right-control/allproject/allproject.component';
import { PersonComponent } from './right-control/person/person.component';
import { MenuComponent } from './right-control/menu/menu.component';
import { FileComponent } from './right-control/file/file.component';


@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    MainRoutingModule,
    FormsModule
  ],
  declarations: [
    MainComponent,
    LeftControlComponent,
    ListComponent,
    HeaderComponent,
    SuggestComponent,
    HomeComponent,
    AllprojectComponent,
    PersonComponent,
    MenuComponent,
    FileComponent
  ]
})
export class MainModule { }