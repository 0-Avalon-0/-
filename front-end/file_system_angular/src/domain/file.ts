export class File {
    pid: number;
    parent_node: string;
    file_fname: string;
    file_property: number;
    file_text: string;
constructor(pid:number,parent_node:string,file_fname:string,file_property:number,file_text:string){
   this.pid=pid;
   this.parent_node=parent_node;
   this.file_fname=file_fname;
   this.file_property=file_property;
   this.file_text=file_text;   
}
}
export class CreateFileHolder{
    file_property:number;
    file_text:string;
  }
  export class Files{
      file_fname:string;
      file_property:number;
      constructor(file_fname:string,file_property:number){
this.file_fname=file_fname;
this.file_property=file_property;
      }
  }
export class allFile{
    path:string;
    pid:number;
    files:Files[];
    constructor(path:string,pid:number,files:Files[]){
        this.path=path;
        this.pid=pid;
        this.files=files;
    }


}