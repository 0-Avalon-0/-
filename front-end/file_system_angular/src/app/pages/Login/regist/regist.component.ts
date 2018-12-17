import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Person, message } from 'src/domain/person';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { USERNAME } from '../../../services/local-storage/local-storage.namespace';
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
  constructor( private httpservice: HttpServiceService,private _router: Router,private store:LocalStorageService) { 
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
  message:string;
  ngOnInit() {
  }
  regist(){
        this.httpservice.regist(this.thisregist).subscribe(message=>this.successRegist(message));

      }
  successRegist(mes:message)
  {
    this.store.set(USERNAME,this.thisregist.user_name)
    this._router.navigate(['/main/home']);
  }
}