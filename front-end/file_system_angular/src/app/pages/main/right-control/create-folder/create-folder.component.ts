import { Component, OnInit } from '@angular/core';
import { File ,CreateFileHolder} from '../../../../../domain/file';
import{FileService} from '../../../../services/file/file.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.css']
})
export class CreateFolderComponent implements OnInit {
  createdFolder:File={
    pid:this.fileService.getPid(),
    parent_node:this.fileService.getParentNode(),
    file_fname:'',
    file_property:1,
    file_text:''
  }

  thisFile:CreateFileHolder={
    file_property:1,
    file_text:''
  }

  create():void{
    this.fileService.createFile(this.thisFile,this.createdFolder.file_fname,this.createdFolder.pid,this.createdFolder.parent_node);
  }
  back():void{
    this.router.navigate(['main','home']);
  }

  constructor(private fileService:FileService,
    private router:Router) { }

  ngOnInit() {
  }

}
