import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { LeftControlComponent } from './left-control/left-control.component';
import { ListComponent } from './left-control/list/list.component';
import { HeaderComponent } from './right-control/header/header.component';
import { HomeComponent } from './right-control/home/home.component';
import { AllprojectComponent } from './right-control/allproject/allproject.component';
import { PersonComponent } from './right-control/person/person.component';
import { FileComponent } from './right-control/file/file.component';
import { CreateFileComponent } from './right-control/create-file/create-file.component';
import { CreateFolderComponent } from './right-control/create-folder/create-folder.component';
import { ProjectComponent } from './right-control/project/project.component';


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
    HomeComponent,
    AllprojectComponent,
    PersonComponent,
    FileComponent,
    CreateFileComponent,
    CreateFolderComponent,
    ProjectComponent
  ]
})
export class MainModule { }
