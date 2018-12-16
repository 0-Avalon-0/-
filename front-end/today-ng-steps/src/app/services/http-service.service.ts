import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {Observable,of,throwError} from 'rxjs'; 
import {Person,login,message, project, project_set} from '../../domain/person'
import { catchError, map, retry } from 'rxjs/operators';
import { HttpHeaders ,HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import {CreateFileHolder} from '../../domain/file'; 
const httpOptions = {
  withCredentials: true,
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
})
};
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  private api_url ;
  constructor(private http: HttpClient, private apiService: ApiService,private _router: Router) { 
    this.api_url = apiService
    httpOptions.withCredentials=true;
  }
  LOGIN=1;
  REGIST=2;
  PERSONMESSAGE=3;
  PROJECT=4;
  MENU=5;
  FILE=6
  private handleError(operation = 0) {
    return (error: any)=>{
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      alert('请检查网络，错误信息:\n'+ error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if (error.status=="404")
      {
        if (operation==this.LOGIN)
        {
            alert("用户名或密码错误")
        }
        else if(operation==this.PROJECT)
        {
          alert("项目不存在")
        }
        else if(operation==this.PERSONMESSAGE)
        {
          alert("用户不存在")
        }
      }
      else if(error.status=="403")
      {
            alert("403权限不足")
      }
      else if(error.status=="422")
      {
            alert("用户名已被占用")
      }
      else if(error.status=="400")
      {
            alert("格式不正确")
      }
      else if(error.status=="401")
      {
        this._router.navigate(['/login']);
      }
      else if(error.status=="500")
      {
            alert("服务器不可用，请稍后重试")
      }
      else {
        alert(
          "发送未知错误"+
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
    }
  };
  login(logs:login,name:string):Observable<message>{
    return this.http.post<message>(this.api_url.getLogUrl()+"/"+name,(logs),httpOptions).pipe(
      retry(1),
      catchError(this.handleError(1))
    );
  }
  regist (hero: Person): Observable<message> {
    return this.http.post<message>(this.api_url.getRegistUrl(),(hero),httpOptions).pipe(
      catchError(this.handleError(2))
    );
  }
  getPersonMessage(name:string):Observable<message> {
    return this.http.get<message>(this.api_url.getPersonManage()+"/"+name,httpOptions).pipe(
      catchError(this.handleError(3))
    );
  }
  setPersonMessage(hero:Person,name:string):Observable<message> {
    return this.http.patch<message>(this.api_url.getPersonManage()+"/"+name,(hero),httpOptions).pipe(
      catchError(this.handleError(3))
    );
  }
  newProject(current_project:project)
  {
    return this.http.post<message>(this.api_url.getProjectManage(),(current_project),httpOptions).pipe(
      catchError(this.handleError(4))
    );
  }
  getProjectPro(pid:string)
  {
    return this.http.get<message>(this.api_url.getProjectManage()+"/"+pid,httpOptions).pipe(
      catchError(this.handleError(4))
    );
  }
  setProjectPro(hero:project_set,pid:string):Observable<message> {
    return this.http.patch<message>(this.api_url.getProjectManage()+"/"+pid,hero,httpOptions).pipe(
      catchError(this.handleError(4))
    );
  }
  getProjectProAll()
  {
    return this.http.get<message>(this.api_url.getProjectManage()+"/user",httpOptions).pipe(
      catchError(this.handleError(4))
    );
  }
  deleteProject(pid :string)
  {
    return this.http.delete<message>(this.api_url.getProjectManage()+"/"+pid,httpOptions).pipe(
      catchError(this.handleError(4))
    );
  }
  getMenus(rootPath:string,pid :number)
  {
    return this.http.get<message>(this.api_url.getMenuManage()+"/"+rootPath+"/"+pid,httpOptions).pipe(
      catchError(this.handleError(5))
    );
  }
  createFile(createFileHolder:CreateFileHolder,file_fname:string,file_node:string,pid:number):Observable<message>{
    return this.http.post<message>('filemanagers/'+file_fname+'/project'+pid+'/file?path='+file_node,createFileHolder,httpOptions).pipe(
      catchError(this.handleError(5)
    ));
  }
  private log(message: string) {
    alert(`HeroService: ${message}`);
  }
}
