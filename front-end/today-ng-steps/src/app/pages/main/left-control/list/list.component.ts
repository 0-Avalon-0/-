import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  OnDestroy,
  ViewChild,
  ElementRef
  ,EventEmitter, Output
} from '@angular/core';
import {
  NzDropdownService,
  NzDropdownContextComponent,
  NzModalService
} from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { List } from '../../../../../domain/entities';
import { ListService } from '../../../../services/list/list.service';
import { LocalStorageService } from '../../../../services/local-storage/local-storage.service'
import { USERNAME } from '../../../../services/local-storage/local-storage.namespace';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../right-control/header/header.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [ './list.component.css' ]
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() isCollapsed: boolean;
  @ViewChild('listRenameInput') private listRenameInput: ElementRef;
  @ViewChild('listInput') private listInput: ElementRef;
  @ViewChild('listInput_des') private listInput_des: ElementRef;
  lists: List[];
  currentListUuid: string;
  contextListUuid: string;
  addListModalVisible = false;
  renameListModalVisible = false;
  project_property=0;
  private dropdown: NzDropdownContextComponent;
  private destroy$ = new Subject();
  constructor(
    private dropdownService: NzDropdownService,
    private listService: ListService,
    private modal: NzModalService,
    private store: LocalStorageService,
    private _router: Router

  ) { }

  ngOnInit() {
    this.listService.InitAllproject();
    this.listService.lists$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lists => {
        this.lists = lists;
      });

    this.listService.currentUuid$
      .pipe(takeUntil(this.destroy$))
      .subscribe(uuid => {
        this.currentListUuid = uuid;
      });

  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  closeAddListModal(): void {
    this.addListModalVisible = false;
  }

  closeRenameListModal(): void {
    this.renameListModalVisible = false;
  }

  openAddListModal(): void {
    this.addListModalVisible = true;
    setTimeout(() => {
      this.listInput.nativeElement.focus();
    });
  }

  openRenameListModal(): void {
    this.renameListModalVisible = true;
    setTimeout(() => {
      const name = this.lists.find(l => l.pid === this.contextListUuid).project_pname;
      this.listRenameInput.nativeElement.value = name;
      this.listRenameInput.nativeElement.focus();
    });
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>, uuid: string): void {
    this.dropdown = this.dropdownService.create($event, template);
    this.contextListUuid = uuid;
  }

  click(_id: string): void {
    this.listService.setCurrentUuid(_id);
  }
  click_person():void{
    this._router.navigateByUrl('/main/person');
  }
  click_project():void{
    this._router.navigateByUrl('/main/allproject');
  }
  click_home():void{
    this._router.navigateByUrl('/main/home');
  }
  rename(name: string): void {
    this.listService.rename(this.contextListUuid, name);
    this.closeRenameListModal();
  }

  add(name: string,describe:string): void {
    this.listService.add(name,describe,this.project_property);
    this.closeAddListModal();
  }

  delete(): void {
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
  }

  close(): void {
    this.dropdown.close();
  }
}
