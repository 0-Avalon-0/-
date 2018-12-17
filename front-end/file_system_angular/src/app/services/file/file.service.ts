import { Injectable } from '@angular/core';
import {File,CreateFileHolder,Files,allFile } from '../../../domain/file';
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

  private files:File[] = [];
  private index ;

  constructor(private httpService: HttpServiceService,
    private store:LocalStorageService) {
  
  }
  
  //6.1 查看目录下所有文件：GET menus / project / {pid} / path?path=...
  private testFile:File;//写好后接实际参数
  initAllFile(){//工程路径;pid
    this.httpService.getMenus(this.testFile.parent_node,this.testFile.pid).subscribe(message=>this.successGetMenus(message));
  }
  private menu:Files[];
  successGetMenus(mes:message){
  //收到的形式为name/property
  this.menu=(<allFile>JSON.parse(mes.data)).files;
  this.index=this.menu.length;
  for(var i = 0 ; i < this.menu.length;i++){
    this.files[i].file_fname=this.menu[i].file_fname;
    this.files[i].file_property=this.menu[i].file_property;
  }
  }

//5.3新建文档：POST / filemanagers / {fname} / project / {pid} / file?path=...
  createFileHolder:CreateFileHolder;
  createFile(createFileHolder:CreateFileHolder,file_fname:string,pid:number,parent_node:string) {
    this.httpService.createFile(createFileHolder,file_fname,pid,parent_node).subscribe(message => this.successCreateFile(file_fname,createFileHolder.file_text,parent_node,pid))
  }
  successCreateFile(file_fname: string, file_text: string,parent_node:string,pid:number): void {
  const fileHolder=new File(pid,parent_node,file_fname,0,file_text);
    this.files[this.index]=fileHolder;
    this.index++;
  }

}

