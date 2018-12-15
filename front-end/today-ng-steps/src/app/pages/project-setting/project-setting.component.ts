
import { Component, ElementRef, Host, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { AVATAR_CODE, USERNAME } from '../../services/local-storage/local-storage.namespace';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { message, Person } from 'src/domain/person';

@Component({
  selector: 'app-project-setting',
  templateUrl: './project-setting.component.html',
  styleUrls: ['./project-setting.component.less']
})
export class ProjectSettingComponent implements OnInit {

  avatar = this.store.get(AVATAR_CODE);
  user:Person=
  {
    user_name:this.store.get(USERNAME),
    user_password:"",
    user_gender:0,
    user_email:"",
    user_signature:"",
    user_company:"",
    user_location:"",
  }
  changeable:boolean;
  radioValue:number;
  @HostBinding('@pageSwitchTransition') state = 'activated';
  @ViewChild('usernameInput') private usernameInput: ElementRef;

  constructor(
    private store: LocalStorageService,
    private message: NzMessageService,
    private router: Router,
    private httpservice:HttpServiceService,
    private activatedRoute: ActivatedRoute
  ) { }
 pid:string;
  ngOnInit() {
    this.usernameInput.nativeElement.value = this.user.user_name;
    this.changeable=false;
    this.pid = this.activatedRoute.snapshot.params['pid'];
    alert(this.pid)
    this.httpservice.getPersonMessage(this.store.get(USERNAME)).subscribe(message=>this.successget(message));
  }
  successget(mes:message):void
  {
    const person=<Person>JSON.parse(mes.data)
    // this.user_password=person.user_password;
    this.user.user_gender=person.user_gender;
    this.user.user_email=person.user_email;
    this.user.user_signature=person.user_signature;
    this.user.user_company=person.user_company;
    this.user.user_location=person.user_location;
  }
  validateUsername(username: string): void {
    if (!username) {
      this.message.error('用户名不能为空');
      this.usernameInput.nativeElement.value = this.user.user_name;
    } 
  }
  validatePassword(userpassword:string):void{
    if (!userpassword) {
      this.message.error('密码不能为空');
      this.usernameInput.nativeElement.value = this.user.user_name;
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
    this.httpservice.setPersonMessage(this.user,this.user.user_name).subscribe(message=>this.successset(message));
  }
  successset(mes:message):void{
    this.user=<Person>JSON.parse(mes.data)
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

}
