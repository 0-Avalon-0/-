export class File {
    pid: number;
    parent_node: string;
    file_fname: string;
    file_property: number;
    file_text: string;
    constructor(pid: number, parent_node: string, file_fname: string, file_property: number, file_text: string) {
        this.pid = pid;
        this.parent_node = parent_node;
        this.file_fname = file_fname;
        this.file_property = file_property;
        this.file_text = file_text;
    }
}
export class CreateFileHolder {
    file_property: number;
    file_text: string;
}
export class Files {
    file_fname: string;
    file_property: number;
    constructor(file_fname: string, file_property: number) {
        this.file_fname = file_fname;
        this.file_property = file_property;
    }
}
export class AllFile {
    path: string;
    pid: number;
    files: File[];
    constructor(path: string, pid: number, files:File[]) {
        this.path = path;
        this.pid = pid;
        this.files = files;
    }


}
export class RenameFileHolder {
    file_fname: string;
    constructor(file_fname: string) {
        this.file_fname = file_fname;
    }
}
export class ChangeFileHolder {
    file_text: string;
    constructor(file_text: string) {
        this.file_text = file_text;
    }
}
export class GetFileHolder{
    file_text:string;
    fname:string;
    path:string;
    pid:number;
    constructor(file_text:string,fname:string,path:string,pid:number){
        this.file_text=file_text;
        this.fname=fname;
        this.path=path;
        this.pid=pid;
    }
}
export class ReNameFileHolder{
    fname:string;
    path:string;
    pid:number;
    constructor(name:string,path:string,pid:number){
        this.fname=name;
        this.path=path;
        this.pid=pid;
    }
}
export class CreateHolder{
    pid: number;
    path: string;
    file_fname: string;
    file_property: number;
    file_text: string;
    constructor(pid: number, parent_node: string, file_fname: string, file_property: number, file_text: string) {
        this.pid = pid;
        this.path = parent_node;
        this.file_fname = file_fname;
        this.file_property = file_property;
        this.file_text = file_text;
    }
}