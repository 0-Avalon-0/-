import { Component, OnInit } from '@angular/core';
import { File } from '../../../../../domain/file';
import{HttpServiceService}from '../../../../services/http-service.service';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.css']
})
export class CreateFileComponent implements OnInit {

  createdFile:File;

  create():void{
    this.createdFile.file_property = 0;
    //httpPostFile(this.createdFile);
    this.httpSerivce.setFileName(this.createdFile.file_fname,"A",1);
  }

  constructor(private httpSerivce:HttpServiceService) { }

  ngOnInit() {
  }

}
