import { Component, OnInit,  Input,
  TemplateRef,
  OnDestroy,
  ViewChild,
  ElementRef, DoCheck, ChangeDetectorRef, NgZone } from '@angular/core';
  import {
    NzDropdownService,
    NzDropdownContextComponent,
    NzModalService
  } from 'ng-zorro-antd';
  import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import {  File,CreateFileHolder } from '../../../../../domain/file';
import { FileService } from '../../../../services/file/file.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {Location} from '@angular/common';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit {
  @ViewChild('fileNameInput') private fileNameInput: ElementRef;
  @ViewChild('fileTextInput') private fileTextInput: ElementRef;
  @ViewChild('folderNameInput') private folderNameInput: ElementRef;
  @ViewChild('renameInput') private renameInput:ElementRef;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private router: Router,
    private location:Location
  ) { }
  page = "可对项目文件进行进一步编辑，注意：您对部分文件的操作可能受到限制";
  listitle = "工程"
  pid: string;
  _pid: number;
  files: File[];
  file: File;
  selectedFile: File;
  parent_node = 'root';
  createFileModelVisible = false;
  createFolderModelVisible = false;
  renameModelVisible = false;
  editModelVisible = false;
  private destroy$ = new Subject();
  private slashIndex;
  private oldName;
  private file_text='';
  navigateTo="";

  
  createFileHolder: CreateFileHolder = {
    file_property: 0,
    file_text:''
  }
  createFolderHolder:CreateFileHolder = {
    file_property:1,
    file_text:''
  }

  clickSelectedFile(i: number): void {
    this.fileService.setCurrentIndex(i);
    this.selectedFile = this.files[i];
    if(this.editModelVisible==true){
      this.editModelVisible=false;
    }
    if (this.selectedFile.file_property == 0) {
      this.editFile(i);
    }
    else if (this.selectedFile.file_property == 1) {
      this.parent_node += '%2F';
      this.parent_node += this.selectedFile.file_fname;
      this.fileService.setParentNode(this.parent_node);
      this.fileService.getMenus(this.parent_node, this._pid);
    }
  }

  back():void{
    if(this.editModelVisible==true){
      this.editModelVisible=false;
    }
    this.slashIndex = this.parent_node.lastIndexOf('%');
    if(this.slashIndex!=-1){
      this.parent_node=this.parent_node.substring(0,this.slashIndex);
      this.fileService.setParentNode(this.parent_node);
      this.fileService.getMenus(this.parent_node, this._pid);
    }
  }

  openCreateFileModel():void{
    this.createFileModelVisible= true;
    setTimeout(()=>{
      this.fileNameInput.nativeElement.focus();
    });
  }
  openCreateFolderModel():void{
    this.createFolderModelVisible= true;
    setTimeout(()=>{
      this.folderNameInput.nativeElement.focus();
    });
  }

  openRenameModel(i:number):void{
    this.fileService.setCurrentIndex(i);
    this.renameModelVisible= true;
    this.oldName=this.fileService.returnFile(i).file_fname;
    setTimeout(()=>{
      const name = this.fileService.returnFile(i).file_fname;
      this.renameInput.nativeElement.value = name;
      this.renameInput.nativeElement.focus();
    });
  }
  closeRenameModel():void{
    this.renameModelVisible = false;
    this.fileService.getMenus(this.parent_node, this._pid);
  }

  closeCreateFileModel():void{
    this.createFileModelVisible = false;
    this.fileService.getMenus(this.parent_node, this._pid);
  }
  closeCreateFolderModel():void{
    this.createFolderModelVisible = false;
    this.fileService.getMenus(this.parent_node, this._pid);
  }

  createFile(name:string,text:string):void{
    this.createFileHolder.file_text=text;
    this.fileService.createFile(this.createFileHolder,name,this._pid,this.parent_node);
    this.fileService.getMenus(this.parent_node, this._pid);
    this.closeCreateFileModel();
  }
  createFolder(name:string):void{
    this.fileService.createFile(this.createFolderHolder,name,this._pid,this.parent_node);
    this.fileService.getMenus(this.parent_node, this._pid);
    this.closeCreateFolderModel();
  }

  rename(name:string):void{
    this.fileService.renameFile(this.fileService.getCurrentIndex(),name,this.oldName);
    this.fileService.getMenus(this.parent_node, this._pid);
    this.closeRenameModel();
  }

  delete(i:number):void{
    this.fileService.setCurrentIndex(i);
    this.fileService.deleteFile(i);
    this.fileService.getMenus(this.parent_node, this._pid);
  }
 
  editFile(i:number):void{
    this.fileService.setCurrentIndex(i);
 this.fileService.getFile(i);
 this.file_text=this.files[i].file_text;
this.editModelVisible=true;  
}
  saveFile():void{
this.fileService.changeFile(this.fileService.getCurrentIndex(),this.file_text);
this.fileService.getMenus(this.parent_node, this._pid);
this.editModelVisible=false;  
}





  ngOnInit() {
    
    this.activatedRoute.params.forEach((params: Params) => { 
      this.parent_node='root';
      this.pid = this.activatedRoute.snapshot.params['pid'];
      this.navigateTo='projectconfigure/'+this.pid
      this._pid=parseInt(this.pid);
      this.fileService.getMenus(this.parent_node,this._pid);
      this.fileService.setPid(this._pid);
      this.fileService.setParentNode(this.parent_node);
      this.fileService.getMenus(this.parent_node, this._pid);
      this.fileService.files$.pipe(takeUntil(this.destroy$)).subscribe(files=>{
        this.files = files;
      });
    });
  }

}
