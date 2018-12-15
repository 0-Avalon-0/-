import { Component, OnInit } from '@angular/core';
import { File } from '../../../../../domain/file';
import{FileService} from '../../../../services/file/file.service';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.css']
})
export class CreateFolderComponent implements OnInit {
  createdFolder:File;

  create():void{
    this.createdFolder.file_property = 1;
    //httpPostFile(this.createdFile);
  }

  constructor() { }

  ngOnInit() {
  }

}
