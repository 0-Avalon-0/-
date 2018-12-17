import { generateUUID } from '../utils/uuid';
import { project_authoritys} from './person';

export class Todo {
  _id: string;
  title: string;
  createdAt: number;
  listUUID: string;
  desc: string;
  completedFlag: boolean;
  completedAt: number;
  dueAt: number;
  planAt: number;
  notifyMe = false;

  constructor(id:string,title: string, listUUID?: string) {
    this._id = id;
    this.title = title;
    this.listUUID = listUUID;
    this.completedFlag = false;
  }
}

export class List {
  pid: string;
  project_pname:string;
  project_describe: string;
  project_establisher: string;
  project_property :string;
  content:project_authoritys[];
  constructor(id:string,createBy:string,describe: string,name:string,property:string,content:project_authoritys[]) {
    alert(name);
    this.pid = id;
    this.project_describe = describe;
    this.project_establisher=createBy;
    this.project_pname=name;
    this.project_property=property;
    this.content=content;
  }
}

export class Summary {
  _id: string;
  date: number;
  completedTodos: string[];
  cCount = 0;
  uncompletedTodos: string[];
  uCount = 0;

  constructor(date: number, cItems: string[], uItems: string[]) {
    this.date = date;
    this.completedTodos = cItems;
    this.uncompletedTodos = uItems;
    this.cCount = this.completedTodos.length;
    this.uCount = this.uncompletedTodos.length;
  }
}
