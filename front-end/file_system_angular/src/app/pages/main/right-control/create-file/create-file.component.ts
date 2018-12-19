import { Component, OnInit } from '@angular/core';
import { File, CreateFileHolder } from '../../../../../domain/file';
import { FileService } from '../../../../services/file/file.service';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.css']
})
export class CreateFileComponent implements OnInit {

  createdFile:File;
  thisFile: CreateFileHolder = {
    file_property: 0,
    file_text:''
  }

  create(): void {

    this.fileService.createFile(this.thisFile,this.createdFile.file_fname,this.createdFile.pid,this.createdFile.parent_node);
  
  }

  constructor(private fileService: FileService) {
  }
  ngOnInit() {
    this.createdFile = new File(this.fileService.getPid(),'','',0,'');
  }

}
