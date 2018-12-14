import { Injectable } from '@angular/core';
import { File } from 'src/domain/file';
import {FILES} from '../../../domain/test-file'

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private selectedFile;
  getFiles(file_fname:string): File[] {
    //return http.get(file_fname);
    return  FILES;
    }
  setSelectedFile(file:File){
  this.selectedFile = file;
  }
  getSelectedFile():File{
    return this.selectedFile;
  }


  constructor() { }
}
