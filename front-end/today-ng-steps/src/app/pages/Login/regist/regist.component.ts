import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Person, message } from 'src/domain/person';
import { Router } from '@angular/router';

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
  constructor( private httpservice: HttpServiceService,private _router: Router) { 
  }
  thisregist: Person = {
    user_name: "123887678678",
    user_password:"456",
    user_gender:"123123",
    user_email:"123123@163.com",
  }
  message:string;
  ngOnInit() {
  }
  regist(){
        this.httpservice.regist(this.thisregist).subscribe(message=>this.successRegist(message));
      }
  successRegist(mes:message)
  {
    this
    this._router.navigate(['/main']);
  }
}