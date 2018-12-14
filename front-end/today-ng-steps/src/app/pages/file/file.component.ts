import { Component, OnInit } from '@angular/core';
import { File } from '../../../domain/file';
import{FileService} from '../../services/file.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  changeFileOption:String;//1:新建 2：查看 3：修改 4：删除 
  changeFile: File;
  createFile(): void {
    this.changeFileOption = '1';
    this.changeFile.file_property = 0;
  }
  createF():void{
    //httpPostFile(this.changeFile);
  }
  lookFile():void{
    this.changeFileOption='2';
    this.changeFile=this.fileService.getSelectedFile();
  }
  editFile():void{
    this.changeFileOption='3';
    this.changeFile=this.fileService.getSelectedFile();
  }
  editFinished():void{
    this.lookFile();
  }
  deleteFile():void{
    this.changeFileOption='4';
    this.changeFile=this.fileService.getSelectedFile();
    //httpDeleteFile(this.changeFile);
  }


  constructor(private fileService:FileService) { }

  ngOnInit() {
  }

}
