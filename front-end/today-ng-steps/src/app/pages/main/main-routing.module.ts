import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './right-control/home/home.component';
import { AllprojectComponent } from './right-control/allproject/allproject.component';
import { BrowserModule } from '@angular/platform-browser';
import { PersonComponent } from './right-control/person/person.component';
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
