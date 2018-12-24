import { Component, OnInit } from '@angular/core';
import { File, CreateFileHolder } from '../../../../../domain/file';
import { FileService } from '../../../../services/file/file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.css']
})
export class CreateFileComponent implements OnInit {

  createdFile:File={
    pid:this.fileService.getPid(),
    parent_node:this.fileService.getParentNode(),
    file_fname:'',
    file_property:0,
    file_text:''
  }
  thisFile: CreateFileHolder = {
    file_property: 0,
    file_text:''
  }

  create(): void {
    this.thisFile.file_text=this.createdFile.file_text;
    this.fileService.createFile(this.thisFile,this.createdFile.file_fname,this.createdFile.pid,this.createdFile.parent_node);
  }
  back():void{
    this.router.navigate(['main','home']);
  }

  constructor(private fileService: FileService,
    private router:Router) {
  }
  ngOnInit() {
    
  }

}
