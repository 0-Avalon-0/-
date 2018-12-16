import { Component, OnInit } from '@angular/core';
import { File } from '../../../../../domain/file';
import{FileService}from '../../../../services/file/file.service';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.css']
})
export class CreateFileComponent implements OnInit {

  createdFile:File;

  create():void{
    this.fileService.createFile(this.createdFile.file_fname,this.createdFile.file_text,this.createdFile.parent_node,this.createdFile.pid);//把这些参数存入自己的数据结构
  }

  constructor(private fileService:FileService) { }

  ngOnInit() {
    this.createdFile.file_fname='';
    this.createdFile.file_property=0;
    this.createdFile.file_text='';
    this.createdFile.pid=1;
    this.createdFile.parent_node='\root';
  }

}
