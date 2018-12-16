import { Injectable } from '@angular/core';
import { File, CreateFileHolder } from '../../../domain/file';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { List } from '../../../domain/entities';
import { LISTS } from '../local-storage/local-storage.namespace';
import { HttpServiceService } from '../../services/http-service.service';
import { message, project, projectAll, project_authority, project_set } from '../../../domain/person';

@Injectable({
  providedIn: 'root'
})
export class FileService {


  constructor(private httpService: HttpServiceService) {
  
  }
  files:File[];

  private selectedFile;
  setSelectedFile(file: File): void {
    this.selectedFile = file;
  }
  getSelectedFile(): File {
    return this.selectedFile;
  }
  deleteFile(): void {

    //this.httpSerivce.deleteFile(this.selectedFile);
  }

  createFileHolder:CreateFileHolder;
  createFile(file_fname: string, file_text: string,parent_node:string,pid:number) {
    this.createFileHolder.file_property = 0;
    this.createFileHolder.file_text = file_text;
    this.httpService.createFile(this.createFileHolder,file_fname,parent_node,pid).subscribe(message => this.successCreateFile(file_fname,file_text,parent_node,pid))
  }
  successCreateFile(file_fname: string, file_text: string,parent_node:string,pid:number): void {
    this.files[0].file_fname = file_fname;
    this.files[0].file_text = file_text;
    this.files[0].file_property = 0;
    this.files[0].parent_node = parent_node;
    this.files[0].pid = pid;
    alert("OK!");
  }

}

