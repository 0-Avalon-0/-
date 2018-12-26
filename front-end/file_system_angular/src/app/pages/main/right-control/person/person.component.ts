import { Component, OnInit } from '@angular/core';
import { Person, message } from 'src/domain/person';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { USERNAME } from 'src/app/services/local-storage/local-storage.namespace';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.less']
})
export class PersonComponent implements OnInit {

  constructor(private store:LocalStorageService,private httpservice:HttpServiceService,) { }
  page="可通过设置键更改个人信息"
  listitle="个人信息"
  navigateTo="/setting"
  user:Person=
  {
    user_name:this.store.get(USERNAME),
    user_password:"",
    user_gender:"1",//这个地方有bug  只能初始化为1 只要ngonint给他赋值，第一次显示就会吸纳失败
    user_email:"",
    user_signature:"",
    user_company:"",
    user_location:"",
  }
  ngOnInit() {
    this.httpservice.getPersonMessage(this.store.get(USERNAME)).subscribe(message=>this.successget(message));
  }
  successget(mes:message):void
  {
    const person=<Person>JSON.parse(mes.data)
    this.user.user_password=person.user_password;
   // this.user.user_gender=person.user_gender;显示会出问题
    this.user.user_email=person.user_email;
    this.user.user_signature=person.user_signature;
    this.user.user_company=person.user_company;
    this.user.user_location=person.user_location;
  }
}
