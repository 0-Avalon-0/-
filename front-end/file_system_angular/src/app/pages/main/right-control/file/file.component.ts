import { Component, OnInit} from '@angular/core';
import { File } from '../../../../../domain/file';
import { FileService } from '../../../../services/file/file.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {Location}from '@angular/common';
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  currentFileOption: number = 1;
  currentFile: File = {
    file_fname: '',
    file_text: '',
    file_property: 0,
    parent_node: '',
    pid: 0
  }
  temFileName; string;
  private destroy$ = new Subject();


  editFile(): void {
    this.currentFileOption = 2;
  }
  deleteFile(): void {
    this.currentFileOption = 3;
  }
  renameFile(): void {
    this.temFileName = this.currentFile.file_fname;
    this.currentFileOption = 4;
  }
  saveText(): void {
    this.fileService.changeFile(this.fileService.getCurrentIndex(),this.currentFile.file_text);
    this.currentFileOption = 1;
    this.currentFile.file_text=this.fileService.getCurrentFile().file_text;
  }
  delete(): void {
    this.fileService.deleteFile(this.fileService.getCurrentIndex());
    this.router.navigate(['main', 'home']);
  }
  saveName(): void {
    this.fileService.renameFile(this.fileService.getCurrentIndex(), this.currentFile.file_fname, this.temFileName);
    this.currentFileOption = 1;

  }
  back(): void {
    this.location.back();
    //this.router.navigate(['main', 'home']);
  }
  constructor(private fileService: FileService,
    private router: Router,
    private location:Location
  ) { }

  ngOnInit() {
    this.currentFileOption = 1;
    this.fileService.getFile(this.fileService.getCurrentIndex());
    this.fileService.files$.pipe(takeUntil(this.destroy$)).subscribe(files => {
      this.currentFile = files[this.fileService.getCurrentIndex()];
    });
    
  }

}
