import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute,Params, Route, Router } from '@angular/router';
import {Files,File}from '../../../../../domain/file';
import{FileService} from '../../../../services/file/file.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit {

  constructor(   
    private activatedRoute: ActivatedRoute,
    private fileService:FileService,
    private router:Router
    ) { }
  page="project建议";
  listitle="工程"
  pid:string;
  _pid:number;
  files:Files[];
  file:Files;
  selectedFile:Files;
  parent_node='root';
  navigateTo:string
  clickSelectedFile(i:number):void{
    this.fileService.setCurrentIndex(i);
    this.selectedFile=this.files[i];
    if(this.selectedFile.file_property==0){
      this.router.navigate(['file']);
    }
    else if(this.selectedFile.file_property==1){
      this.parent_node +='/';
      this.parent_node += this.selectedFile.file_fname;
      this.fileService.getMenus(this.parent_node,this._pid);
      this.files=this.fileService.getMenusToProject();
    }
  }


  ngOnInit() {
    
    this.activatedRoute.params.forEach((params: Params) => { 
      this.pid = this.activatedRoute.snapshot.params['pid'];
      this.navigateTo='projectconfigure/'+this.pid
      this._pid=parseInt(this.pid);
      this.fileService.getMenus(this.parent_node,this._pid);
      this.files=this.fileService.getMenusToProject();
      this.fileService.setPid(this._pid);
      alert('yeah');
     }); 
  }

}
