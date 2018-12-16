export class File {
    file_fname: string;
    file_property: number;
    file_text: string;
    pid: number;
    parent_node: string;
        constructor(pid: number, parent_node: string, file_fname: string, file_property: number, file_text: string) {
        this.pid = pid;
        this.parent_node = parent_node;
        this.file_fname = file_fname;
        this.file_property = file_property;
        this.file_text = file_text;
    }
}
export class CreateFileHolder{
    file_property:number;
    file_text:string;
    constructor(file_property:number,file_text:string){
        this.file_property = file_property;
        this.file_text = file_text;
    }
  }
