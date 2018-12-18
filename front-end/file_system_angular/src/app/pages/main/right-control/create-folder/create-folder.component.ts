import { Component, OnInit } from '@angular/core';
import { File ,CreateFileHolder} from '../../../../../domain/file';
import{FileService} from '../../../../services/file/file.service';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.css']
})
export class CreateFolderComponent implements OnInit {
  createdFolder:File;

  thisFile:CreateFileHolder={
    file_property:1,
    file_text:this.createdFolder.file_text
  }

  create():void{
    this.createdFolder.file_property = 1;
    this.createdFolder.parent_node='root\Teddy';
    this.createdFolder.pid=2;
    this.fileService.createFile(this.thisFile,this.createdFolder.file_fname,this.createdFolder.pid,this.createdFolder.parent_node);
  }

  constructor(private fileService:FileService) { }

  ngOnInit() {
  }

}
