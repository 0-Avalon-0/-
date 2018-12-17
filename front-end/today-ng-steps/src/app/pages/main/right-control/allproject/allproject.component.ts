import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  OnDestroy,
  ViewChild,
  ElementRef
  ,EventEmitter, Output}from '@angular/core';
import { List } from 'src/domain/entities';
import { ListService } from 'src/app/services/list/list.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd';
import { RouterState, Router } from '@angular/router';
@Component({
  selector: 'app-allproject',
  templateUrl: './allproject.component.html',
  styleUrls: ['./allproject.component.less']
})
export class AllprojectComponent implements OnInit {
  lists: List[];
  contextListUuid: string;
  @ViewChild('listRenameInput') private listRenameInput: ElementRef;
  constructor(private listService: ListService,private _router:Router,
    private modal: NzModalService,) { 
  }
  page="allproject建议"
  renameListModalVisible = false;
  private destroy$ = new Subject();
  listitle="查看所有工程"
  ngOnInit() {
    this.listService.InitAllproject();
    this.listService.lists$
    .pipe(takeUntil(this.destroy$))
    .subscribe(lists => {
      this.lists = lists;
    });
    
  }
  closeRenameListModal(): void {
    this.renameListModalVisible = false;
  }
  openRenameListModal(): void {
    this.renameListModalVisible = true;
    setTimeout(() => {
      const name = this.lists.find(l => l.pid === this.contextListUuid).project_pname;
      this.listRenameInput.nativeElement.value = name;
      this.listRenameInput.nativeElement.focus();
    });
  }
  rename(name: string): void {
    this.listService.rename(this.contextListUuid, name);
    this.closeRenameListModal();
  }
  gotoSet():void{
    setTimeout(() => 
    {
      this._router.navigate(['projectconfigure/'+this.contextListUuid]);
    },
    200);


  }
  delete(): void {setTimeout(() => 
    {
      const uuid = this.contextListUuid;
      this.modal.confirm({
        nzTitle: '确认删除工程项目',
        nzContent: '该操作会导致该工程下的所有文件删除',
        nzOnOk: () => 
          new Promise((res, rej) => {
            this.listService.delete(uuid);
            res();
          }).catch(() => console.error('Delete list failed'))
      });
    },
    200);
  }
  updateId(i:string):void{
    this.contextListUuid=i
  }
}
