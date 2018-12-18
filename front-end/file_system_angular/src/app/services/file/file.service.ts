import { Injectable } from '@angular/core';
import { File, CreateFileHolder, Files, allFile, RenameFileHolder,ChangeFileHolder } from '../../../domain/file';
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
  private index;//index是当前文件总数

  constructor(private httpService: HttpServiceService,
    private store: LocalStorageService) {

  } 
   //5.1查看文档：GET / filemanagers / {fname} / project / {pid} / file?path=...
getFile(i:number){
  this.httpService.getFile(this.files[i].file_fname,this.files[i].pid,this.files[i].parent_node).subscribe(message=>this.successGetFile(i));
}
successGetFile(i:number){
//查看文档逻辑
}
  

  //5.2修改文档： PUT / filemanagers / {fname} / project / {pid} / file?path=...
changeFile(i:number){
  const changeFileHolder = new ChangeFileHolder(this.files[i].file_text);
  this.httpService.changeFile(this.files[i].file_fname,this.files[i].pid,this.files[i].parent_node,changeFileHolder).subscribe(message=>this.successChangeFile(i));
}
successChangeFile(i:number){
//修改文档逻辑
}

  //5.3新建文档：POST / filemanagers / {fname} / project / {pid} / file?path=...
  createFileHolder: CreateFileHolder;
  createFile(createFileHolder: CreateFileHolder, file_fname: string, pid: number, parent_node: string) {
    this.httpService.createFile(createFileHolder, file_fname, pid, parent_node).subscribe(message => this.successCreateFile(file_fname, createFileHolder.file_text, parent_node, pid));
  }
  successCreateFile(file_fname: string, file_text: string, parent_node: string, pid: number): void {
    alert(file_text);
    const fileHolder = new File(pid, parent_node, file_fname, 0, file_text);
    this.files[this.index] = fileHolder;
    this.index++;
  }

  //5.4删除文档：DELETE / filemanagers / {fname} / project / {pid} / file?path=...
  deleteFile(i: number) {
    this.httpService.deleteFile(this.files[i].file_fname, this.files[i].pid, this.files[i].parent_node).subscribe(message => this.successDeleteFile(i));
  }
  successDeleteFile(i: number) {//i是数组下标,被删除文件直接被覆盖
    for (var j = i; j < this.index - 1; ++j) {
      this.files[j + 1] = this.files[j];
    }
  }

  //6.1 查看目录下所有文件：GET menus / project / {pid} / path?path=...
  
  getMenus(parent_node:string,pid:number) {//工程路径;pid
    this.httpService.getMenus(parent_node,pid).subscribe(message => this.successGetMenus(message));
  alert('afterGetMenus');
  }
  private menu: Files[];
  successGetMenus(mes: message) {
    //收到的形式为name/property
    this.menu = (<allFile>JSON.parse(mes.data)).files;
    this.index = this.menu.length;
    for (var i = 0; i < this.menu.length; i++) {
      this.files[i].file_fname = this.menu[i].file_fname;
      this.files[i].file_property = this.menu[i].file_property;
    }
alert('afterSuccessGetMenus');
  }
  getMenusToProject():Files[]{
    return this.menu;
  }

  //6.2 文档重命名：PATCH / menus / {fname} / project / {pid} / filepaths?path=...
  renameFile(i: number) {
    //click->i,传入的参数应为更新后的filename
    const renameFileHolder = new RenameFileHolder(this.files[i].file_fname);
    this.httpService.renameFile(renameFileHolder, this.files[i].file_fname, this.files[i].pid, this.files[i].parent_node).subscribe(message => this.successRenameFile(this.files[i].file_fname, i));
  }
  successRenameFile(file_fname: string, i: number) {
  //文档重命名逻辑
  }


}

