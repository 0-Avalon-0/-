import { stringify } from "@angular/compiler/src/util";
import { List } from "./entities";

export class Person {
    user_name:string;
    user_gender:string;
    user_password:string;
    user_email:string;
}
export class login{
    user_password:string;
}
export class message{
    code:any;
    data:any;
}
export class project{//新建工程时 需要发送的内容
    project_pname:string;
    project_describe:string;
    project_property:number
    constructor( project_pname:string,project_describe:string,project_property:number)
    {
        this.project_describe=project_describe;
        this.project_pname=project_pname;
        this.project_property=project_property;
    }
}
export class project_authority
{
    project_member:string;
    project_authority:string;
    constructor()
    {
        this.project_member="";
        this.project_authority=""
    }
}
export class project_set{//set某一个具体工程配置的时候
    project_pname:string;
    project_describe:string;
    project_property:string;
    content:project_authority[];
    constructor(project_pname:string,project_describe:string,project_property:string,content:project_authority[])
    {
        this.project_pname=project_pname;
        this.project_describe=project_describe;
        this.project_property=project_property;
        this.content=content;
    }
}
export class projectAll{
    projects:List[];
}
