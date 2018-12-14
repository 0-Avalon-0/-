import { Component, OnInit } from '@angular/core';
import { File } from 'src/domain/file';
import { FileService } from 'src/app/services/file/file.service';
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
  clickSelectedFile(file:File):void{//点击时获取点击的文件（夹）
    this.selectedFile=file;
    this.setSelectedFile();
    if(file.file_property==0){//文件
      //open(file);
    }
    else{//文件夹
      this.file_fname=file.file_fname;
      this.getFiles();
      //refresh未处理
    }
  }
  setSelectedFile():void{
    this.fileService.setSelectedFile(this.selectedFile);
  }
  getFiles(): void {
    this.files = this.fileService.getFiles(this.file_fname);//更新列表中的文件
  }

  constructor(private fileService:FileService) { }

  ngOnInit() {
    this.getFiles();
  }

}
