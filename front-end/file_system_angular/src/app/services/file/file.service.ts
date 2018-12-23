import { Injectable } from '@angular/core';
import { File, CreateFileHolder, Files, AllFile, RenameFileHolder, ChangeFileHolder, GetFileHolder, ReNameFileHolder } from '../../../domain/file';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { List } from '../../../domain/entities';
import { LISTS } from '../local-storage/local-storage.namespace';
import { HttpServiceService } from '../../services/http-service.service';
import { message, project, projectAll, project_authoritys, project_set } from '../../../domain/person';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private files: File[] = [];
  private total = 0;//total是当前文件总数，是最大下标+1
  private currentIndex;
  private currentFile;
  private pid;
  files$ = new Subject<File[]>();

  constructor(private httpService: HttpServiceService) {

  }

  getPid(): number {
    return this.pid;
  }
  setPid(pid: number) {
    this.pid = pid;
  }
  setCurrentIndex(i: number): void {
    this.currentIndex = i;
  }
  getCurrentIndex(): number {
    return this.currentIndex;
  }
  returnFile(i: number): File {
    return this.files[i];
  }

  private broadCast(): void {
    this.files$.next(this.files);
  }

  //5.1查看文档：GET / filemanagers / {fname} / project / {pid} / file?path=...
  getFile(i: number) {
    //alert('i: '+i+'name: '+this.files[i].parent_node);
    this.httpService.getFile(this.files[i].file_fname, this.files[i].pid, this.files[i].parent_node).subscribe(message => this.successGetFile(message));
  }
  successGetFile(mes: message) {
    this.currentFile = <GetFileHolder>JSON.parse(mes.data);
    this.files[this.currentIndex].file_text = this.currentFile.file_text;
    this.broadCast();
  }

  getCurrentFile():GetFileHolder{
    return this.currentFile;
  }


  //5.2修改文档： PUT / filemanagers / {fname} / project / {pid} / file?path=...
  changeFile(i: number,ft:string) {
    const changeFileHolder = new ChangeFileHolder(ft);
    this.httpService.changeFile(this.files[i].file_fname, this.files[i].pid, this.files[i].parent_node, changeFileHolder).subscribe(message => this.successChangeFile(message));
  }
  successChangeFile(mes: message) {
    this.currentFile = <GetFileHolder>JSON.parse(mes.data);
    this.files[this.currentIndex].file_text = this.currentFile.file_text;
    alert("保存成功！");
    this.broadCast();
  }

  //5.3新建文档：POST / filemanagers / {fname} / project / {pid} / file?path=...
  createFileHolder: CreateFileHolder;
  createFile(createFileHolder: CreateFileHolder, file_fname: string, pid: number, parent_node: string) {
    this.httpService.createFile(createFileHolder, file_fname, pid, parent_node).subscribe(message => this.successCreateFile(message, file_fname, createFileHolder.file_text, parent_node, pid));
  }
  successCreateFile(mes: message, file_fname: string, file_text: string, parent_node: string, pid: number): void {

    this.currentFile = <File>JSON.parse(mes.data);
    this.files[this.total] = this.currentFile;
    this.total++;
    this.broadCast();
  }

  //5.4删除文档：DELETE / filemanagers / {fname} / project / {pid} / file?path=...
  deleteFile(i: number) {
    this.httpService.deleteFile(this.files[i].file_fname, this.files[i].pid, this.files[i].parent_node).subscribe(message => this.successDeleteFile(i));
  }
  successDeleteFile(i: number) {//i是数组下标,被删除文件直接被覆盖
    if(i==this.total-1){
      this.total--;
    }
    for (var j = i; j < this.total - 1; ++j) {
      this.files[j + 1] = this.files[j];
    }
    this.total--;
    this.broadCast();
  }

  //6.1 查看目录下所有文件：GET menus / project / {pid} / path?path=...

  getMenus(parent_node: string, pid: number) {//工程路径;pid
    this.httpService.getMenus(parent_node, pid).subscribe(message => this.successGetMenus(message));
  }
  successGetMenus(mes: message) {

    this.files = (<AllFile>JSON.parse(mes.data)).files;
    this.total=this.files.length;

    for (var i = 0; i < this.total; ++i) {
      this.files[i].parent_node = (<AllFile>JSON.parse(mes.data)).path;
    }
    //alert(this.files[3].parent_node);
    this.broadCast();
  }


  //6.2 文档重命名：PATCH / menus / {fname} / project / {pid} / filepaths?path=...
  renameFile(i: number,thisFileName:string,oldFileName:string) {
    const renameFileHolder = new RenameFileHolder(thisFileName);
    this.httpService.renameFile(renameFileHolder, oldFileName, this.files[i].pid, this.files[i].parent_node).subscribe(message => this.successRenameFile(message));
  }
  successRenameFile(mes: message) {
    this.currentFile = <ReNameFileHolder>JSON.parse(mes.data);
    this.files[this.currentIndex].file_fname = this.currentFile.fname;
    this.broadCast();
  }


}

