import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { List } from '../../../domain/entities';
import { HttpServiceService } from '../http-service.service';
import { message, project, projectAll, project_authoritys, project_set } from 'src/domain/person';


type SpecialListUUID = 'home' | 'person'|'today';

@Injectable()
export class ListService {

  private current: List;
  private lists: List[] = [];

  currentUuid: SpecialListUUID | string = 'home';
  currentUuid$ = new Subject<string>();
  current$ = new Subject<List>();
  lists$ = new Subject<List[]>();

  constructor(  
    private store: LocalStorageService,
    private httpservice:HttpServiceService
  ) { 
  }
  InitAllproject()
  {
    this.httpservice.getProjectProAll().subscribe(message=>this.successget(message));
  }
  successget(mess:message)
  {
      this.lists=(<projectAll>JSON.parse(mess.data)).projects;
      this.broadCast();
  }
  private broadCast(): void {
    this.lists$.next(this.lists);
    this.current$.next(this.current);
    this.currentUuid$.next(this.currentUuid);
  }


  private getByUuid(uuid: string): List {
    return this.lists.find(l => l.pid === uuid);
  }

  private update(list: List): void {
    const index = this.lists.findIndex(l => l.pid === list.pid);
    if (index !== -1) {
      this.lists.splice(index, 1, list);
      this.broadCast();
    }
  }

  getCurrentListUuid(): SpecialListUUID | string {
    return this.currentUuid;
  }


  setCurrentUuid(uuid: string): void {
    this.currentUuid = uuid;
    this.current = this.lists.find(l => l.pid === uuid);
    this.broadCast();
  }

  add(name: string,describe:string,property:string): void {
    const newList = new project(name,describe,property);
    this.httpservice.newProject(newList).subscribe(message=>this.successNewproject(message));
  }
  successNewproject(mes :message)
  {
    const newList=<List>JSON.parse(mes.data);
    this.lists.push(newList);
    this.currentUuid = newList.pid;
    this.current = newList;

    this.broadCast();
  }
  rename(listUuid: string, name: string) {
    const list = this.getByUuid(listUuid);
    if (list) {
      this.setRenameProject(list,name)
    }
  }
  setRenameProject(list:List,project_pname="",project_describe="",project_property="",content=[])
  { 
     const projectSetReady=new project_set(project_pname,project_describe,project_property,content)
     this,this.httpservice.setProjectPro(projectSetReady,list.pid).subscribe(message=>this.successSetProject(message,list))
  }
  successSetProject(mes:message,list)
  {
    list=<List>JSON.parse(mes.data)
    this.update(list)
  }
  delete(uuid: string): void {
    const i = this.lists.findIndex(l => l.pid === uuid);
    if (i !== -1) {
      this.httpservice.deleteProject(uuid).subscribe(message=>this.successdelete(message,i));
    }
  }
  successdelete(mess:message,i:number)
  {
    this.lists.splice(i, 1);
    this.currentUuid = this.lists.length
      ? this.lists[ this.lists.length - 1 ].pid
      : this.currentUuid === 'today'
        ? 'today'
        : 'todo';
    this.broadCast();
  }
}
