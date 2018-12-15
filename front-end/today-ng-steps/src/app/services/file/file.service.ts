import { Injectable } from '@angular/core';
import { File } from '../../../domain/file';
import {FILES} from '../../../domain/test-file';
import{HttpServiceService}from '../../services/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private selectedFile;
  setSelectedFile(file:File):void{
  this.selectedFile = file;
  }
  getSelectedFile():File{
    return this.selectedFile;
  }
  deleteFile():void{

//this.httpSerivce.deleteFile(this.selectedFile);
  }
  updateFiles():File[]{
    //http.updateFile();
    return FILES;
  }


  constructor(private httpSerivce:HttpServiceService) { }
}
