import { Component, OnInit } from '@angular/core';
import { File, CreateFileHolder } from '../../../../../domain/file';
import { FileService } from '../../../../services/file/file.service';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.css']
})
export class CreateFileComponent implements OnInit {

  createdFile:File = {
    parent_node:'root\Teddy',
    file_fname:'',
    file_property:1,
    file_text:'',
    pid:2
  }
  thisFile: CreateFileHolder = {
    file_property: 1,
    file_text: this.createdFile.file_text
  }

  create(): void {
    alert('createBegin');
    this.fileService.createFile(this.thisFile,this.createdFile.file_fname,this.createdFile.pid,this.createdFile.parent_node);
    alert('createOver');
  }

  constructor(private fileService: FileService) {
  }
  ngOnInit() {

  }

}
