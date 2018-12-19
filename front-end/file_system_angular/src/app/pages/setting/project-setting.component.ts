
import { Component, ElementRef, Host, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, UploadFile, NzModalService } from 'ng-zorro-antd';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { AVATAR_CODE, USERNAME } from '../../services/local-storage/local-storage.namespace';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { message, Person, project, project_set, project_authoritys } from 'src/domain/person';
import { List } from 'src/domain/entities';
import { pageSwitchTransition } from './setting.animation';
import { ListService } from 'src/app/services/list/list.service';

@Component({
  selector: 'app-project-setting',
  templateUrl: './project-setting.component.html',
  styleUrls: ['./project-setting.component.less'],
  animations: [ pageSwitchTransition ]
})
export class ProjectSettingComponent implements OnInit {

  avatar = this.store.get(AVATAR_CODE);
  loading = false; // bug
  addListModalVisible = false;
  addAuthorityModalVisible=false;
  pro:List=
  {
    pid:"",
    project_pname:"",
    project_describe: "" ,
    project_establisher: "",
    project_property :"",
    content:[],
  }
  projec_authority_object_ready:project_authoritys
  project_authority_ready:string;
  changeable:boolean;
  radioValue:number;
  @HostBinding('@pageSwitchTransition') state = 'activated';

  constructor(
    private store: LocalStorageService,
    private message: NzMessageService,
    private router: Router,
    private httpservice:HttpServiceService,
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService,
    private listservice:ListService
  ) { }
 pid:string;
  ngOnInit() {
    this.changeable=false;
    this.pro.pid = this.activatedRoute.snapshot.params['pid'];
    this.httpservice.getProjectPro(this.pro.pid).subscribe(message=>this.successget(message));
  }
  successget(mes:message):void
  {
    const person=<List>JSON.parse(mes.data)
    // this.user_password=person.user_password;
    this.pro=person;
  }
  validateUsername(username: string): void {
    if (!username) {
      this.message.error('用户名不能为空');
    } 
  }
  validatePassword(userpassword:string):void{
    if (!userpassword) {
      this.message.error('密码不能为空');
    }
  }
  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleAvatarImageChange(info: { file: UploadFile }): void {
    // This method would be triggered three times, I guess it's a bug of ng-zorro-antd.
    this.getBase64(info.file.originFileObj, (img: string) => {
      this.avatar = img;
      this.store.set(AVATAR_CODE, img);
    });
  }

  goBack(): void {
    if(this.changeable==true)
    {
      this.modal.confirm({
        nzTitle: '确认退出吗',
        nzContent: '更改的数据将无法更新',
        nzOnOk: () => 
          new Promise((res, rej) => {
            this.listservice.setCurrentUuid("home")
            this.router.navigateByUrl('/main/home');
            res();
          }).catch(() => console.error('failed'))
      });
    }
    else {
      this.router.navigateByUrl('/main/home');
    }
  }
  click_button():void{
    const project_Set=new project_set(this.pro.project_pname,this.pro.project_describe,this.pro.project_property,this.pro.content)
    this.httpservice.setProjectPro(project_Set,this.pro.pid).subscribe(message=>this.successset(message));
  }
  successset(mes:message):void{
    this.pro=<List>JSON.parse(mes.data)
    this.listservice.setCurrentUuid("home")
    this.router.navigateByUrl('/main/home');
    this.message.success("修改成功")
  }
  change():void 
  {
      if(this.changeable==false)
      {
          this.changeable=true;
      }
  }
  getAuthority(i:string):string
  {
    if(i=="0")
    {
      return"观察者"
    }
    else if(i=="1")
    {
      return "开发者"
    }
    else 
    {
      return "管理员"
    }
  }
  setAuthority():void{
      this.projec_authority_object_ready.project_authority=this.project_authority_ready;//将变更添加到pro中 等待提交按钮
      this.closeAddListModal();
  }
  openAddListModal(i:string): void {//更改权限窗口
    this.projec_authority_object_ready=this.pro.content.find(x=>x.membername==i)
    this.addListModalVisible = true;
  }
  closeAddListModal(): void {
    this.addListModalVisible = false;
  }


  openAddAuthorityModal(i:string): void {
    this.addAuthorityModalVisible = true;
  }
  closeAddAuthorityModal(): void {
    this.addAuthorityModalVisible = false;
  }
  addAuthority(membername:string):void{
    this.loading = true;
    this.httpservice.addAuthority(membername,this.project_authority_ready,this.pro.pid).subscribe(message=>this.sucessAdd(message))
  }//不等待提交 直接添加
  sucessAdd(mess:message)
  {
    this.pro.content.push(<project_authoritys>JSON.parse(mess.data))
    this.loading=false;
    this.closeAddAuthorityModal();
  }
  successDelete(mess:message,name:string):void
  {
    const i = this.pro.content.findIndex(l => l.membername === name);
    if (i !== -1) {
      this.pro.content.splice(i, 1);
    }
    this.loading=false;
  }
  deleteAuthority(name :string):void{
    this.modal.confirm({
      nzTitle: '确认删除该成员吗',
      nzContent: '该操作会导致该成员对于改工程失去权限',
      nzOnOk: () => 
        new Promise((res, rej) => {
          this.loading=true;
          this.httpservice.deleteAuthority(this.pro.pid,name).subscribe(message=>this.successDelete(message,name))
                    res();
        }).catch(() => console.error('Delete list failed'))
    });
  }

}
