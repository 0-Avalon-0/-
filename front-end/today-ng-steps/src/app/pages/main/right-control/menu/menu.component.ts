import { Component, OnInit } from '@angular/core';
import { File } from '../../../../../domain/file';
import { FileService } from '../../../../services/file/file.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  files:File[];
  file:File;
  file_fname:string;
  selectedFile:File;
  clickSelectedFile(file:File):void{
    this.selectedFile=file;
    this.setSelectedFile();
    if(file.file_property==0){//文件
      //改变路由，跳转到file
    }
    else{//文件夹
      this.fileService.updateFiles();
    }
  }
  setSelectedFile():void{
    this.fileService.setSelectedFile(this.selectedFile);
  }
  constructor(
    private fileService:FileService,
    ) { }
  ngOnInit() {
    this.fileService.updateFiles();
  }
}
