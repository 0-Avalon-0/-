import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { login, message } from 'src/domain/person';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { USERNAME } from '../../../services/local-storage/local-storage.namespace';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router,private httpservice:HttpServiceService,private store: LocalStorageService,) { }
  thislog: login = {
    user_password:"456",
  }
  name:string
  ngOnInit() {
  }
  onLogin(): void {
    this.httpservice.login(this.thislog,this.name).subscribe(message=>this.successLog(message));
  }
  successLog(mes :message)
  {
    this.store.set(USERNAME,this.name)
    this._router.navigate(['/main/home']);
  }
}