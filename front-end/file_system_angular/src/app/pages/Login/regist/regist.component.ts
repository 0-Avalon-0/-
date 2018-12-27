import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Person, message } from 'src/domain/person';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { USERNAME } from '../../../services/local-storage/local-storage.namespace';
import { NzMessageService } from 'ng-zorro-antd';
export class regist {
  name: string;
  password: string;
  password_re: string;
  email:string;
}
@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent implements OnInit {
  constructor( private httpservice: HttpServiceService,private _router: Router,private store:LocalStorageService,
    private message: NzMessageService) { 
  }
  thisregist: Person = {
    user_name: "",
    user_password:"",
    user_gender:"",
    user_email:"",
    user_signature:"",
    user_company:"",
    user_location:"",
  }
  password_re:string;
  ngOnInit() {
  }
  regist(){
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if(!myreg.test(this.thisregist.user_email))
    {
      this.message.error("邮箱格式不正确")
    }
    else if (this.thisregist.user_password=="")
    {
      this.message.error("密码不能为空")
    }
    else if (this.thisregist.user_name=="")
    {
      this.message.error("用户名不能为空")
    }
    else if(this.password_re!=this.thisregist.user_password)
    {
      this.message.error("请输入相同的密码")
    }
    else{
        this.httpservice.regist(this.thisregist).subscribe(message=>this.successRegist(message));
    }
      }
  successRegist(mes:message)
  {
    this.store.set(USERNAME,this.thisregist.user_name)
    this._router.navigate(['/main/home']);
  }
}