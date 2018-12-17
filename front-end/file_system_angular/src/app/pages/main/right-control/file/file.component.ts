import { Component, OnInit } from '@angular/core';
import { File } from '../../../../../domain/file';
import{FileService} from '../../../../services/file/file.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  changeFileOption:number;//1:新建 2：查看 3：修改 4：删除 
  changeFile: File;

  save():void{
    this.fileService.setSelectedFile(this.changeFile);
    this.changeFileOption = 1;
  }

  editFile():void{
    this.changeFileOption=2;
    this.changeFile=this.fileService.getSelectedFile();
  }
  deleteFile():void{
    this.changeFileOption=3;
    this.changeFile=this.fileService.getSelectedFile();
    
  }
  delete():void{
    this.fileService.deleteFile();
    this.changeFileOption=4;
  }
  back():void{
    this.location.back();
  }


  constructor(private fileService:FileService,
    private location:Location
    ) { }

  ngOnInit() {
    this.changeFileOption=1;
  }

}
