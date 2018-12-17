import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './right-control/home/home.component';
import { AllprojectComponent } from './right-control/allproject/allproject.component';
import { BrowserModule } from '@angular/platform-browser';
import { PersonComponent } from './right-control/person/person.component';
import { ProjectComponent } from './right-control/project/project.component';
const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children :[{
      path:'home',
      component: HomeComponent
    },{
      path:'allproject',
      component: AllprojectComponent
    },{
      path:'project/:pid',
      component: ProjectComponent
    },
    {
      path:'person',
      component: PersonComponent
    }]
    
  },
];

@NgModule({
  imports: [ BrowserModule,RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MainRoutingModule { }
