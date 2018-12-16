
import { Component, ElementRef, Host, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { AVATAR_CODE, USERNAME } from '../../services/local-storage/local-storage.namespace';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { message, Person, project, project_set, project_authority } from 'src/domain/person';
import { List } from 'src/domain/entities';
import { pageSwitchTransition } from './setting.animation';

@Component({
  selector: 'app-project-setting',
  templateUrl: './project-setting.component.html',
  styleUrls: ['./project-setting.component.less'],
  animations: [ pageSwitchTransition ]
})
export class ProjectSettingComponent implements OnInit {

  avatar = this.store.get(AVATAR_CODE);
  initLoading = true; // bug
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
  projec_authority_object_ready:project_authority
  project_authority_ready:string;
  changeable:boolean;
  radioValue:number;
  @HostBinding('@pageSwitchTransition') state = 'activated';

  constructor(
    private store: LocalStorageService,
    private message: NzMessageService,
    private router: Router,
    private httpservice:HttpServiceService,
    private activatedRoute: ActivatedRoute
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
    this.router.navigateByUrl('/main/home');
  }
  click_button():void{
    const project_Set=new project_set(this.pro.project_pname,this.pro.project_describe,this.pro.project_property,this.pro.content)
    this.httpservice.setProjectPro(project_Set,this.pro.pid).subscribe(message=>this.successset(message));
  }
  successset(mes:message):void{
    this.pro=<List>JSON.parse(mes.data)
    this.router.navigateByUrl('/main');
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
      this.projec_authority_object_ready.project_authority=this.project_authority_ready;
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
  addAuthority():void{
    
  }
  onLoadMore():void{

  }
}
