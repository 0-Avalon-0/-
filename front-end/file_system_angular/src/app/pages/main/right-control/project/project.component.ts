import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import {Files}from '../../../../../domain/file';
import{FileService} from '../../../../services/file/file.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit {

  constructor(   
    private activatedRoute: ActivatedRoute,
    private fileService:FileService
    ) { }
  page="project建议";
  listitle="工程"
  pid:string;
  files:Files[];
  file:Files;
  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => { 
      this.pid = this.activatedRoute.snapshot.params['pid'];
      this.fileService.getMenus('root/',11);
      this.files=this.fileService.getMenusToProject();
     }); 
  }

}
