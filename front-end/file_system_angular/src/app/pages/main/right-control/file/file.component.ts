import { Component, OnInit } from '@angular/core';
import { File } from '../../../../../domain/file';
import { FileService } from '../../../../services/file/file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  currentFileOption: number;
  currentFile: File;

  editFile(): void {
    this.currentFileOption = 2;
  }
  deleteFile(): void {
    this.currentFileOption = 3;
  }
  renameFile(): void {
    this.currentFileOption = 4;
  }
  saveText(): void {
    this.fileService.changeFile(this.fileService.getCurrentIndex());
    this.refreshCurrentFile();
    this.currentFileOption = 1;
  }
  delete(): void {
    this.fileService.deleteFile(this.fileService.getCurrentIndex());
    this.currentFileOption = 5;
  }
  saveName():void{
    this.fileService.renameFile(this.fileService.getCurrentIndex());
    this.refreshCurrentFile();
    this.currentFileOption = 1;

  }
  back(): void {
    this.router.navigate(['main', 'home']);
  }
  refreshCurrentFile(){
    this.currentFile=this.fileService.returnFile(this.fileService.getCurrentIndex());
  }
  constructor(private fileService: FileService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentFileOption = 1;
    this.fileService.getFile(this.fileService.getCurrentIndex());
    this.refreshCurrentFile();
  }

}
