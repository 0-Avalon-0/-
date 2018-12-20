import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {Observable,of,throwError} from 'rxjs'; 
import {Person,login,message, project, project_set, project_authoritys} from '../../domain/person'
import { catchError, map, retry } from 'rxjs/operators';
import { HttpHeaders ,HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import {CreateFileHolder,RenameFileHolder,ChangeFileHolder} from '../../domain/file'; 
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
  FILE=6;
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
      else if(operation==this.FILE){
        alert('文件操作出问题了！');
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
  addAuthority(name:string,authority:string,pid:string)
  {
    const ready={
        project_authority:authority
    }
    return this.http.post<message>(this.api_url.getProjectManage()+"/"+pid+"/"+"user"+"/"+name,(ready),httpOptions).pipe(
      catchError(this.handleError(3))
    );
  }
  deleteAuthority(pid:string,name:string)
  {
    return this.http.delete<message>(this.api_url.getProjectManage()+"/"+pid+"/user/"+name,httpOptions).pipe(
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

  //5.1查看文档：GET / filemanagers / {fname} / project / {pid} / file?path=...
  getFile(file_fname:string,pid:number,parent_node:string)
  {
    return this.http.get<message>(this.api_url.getFileManage()+'/'+file_fname+'/project/'+pid+'/file?path=root'+parent_node,httpOptions).pipe(
      catchError(this.handleError(6))
    );
  }
  //5.2修改文档： PUT / filemanagers / {fname} / project / {pid} / file?path=...
  changeFile(file_fname:string,pid:number,parent_node:string,changeFileHolder:ChangeFileHolder){
    return this.http.put<message>(this.api_url.getFileManage()+'/'+file_fname+'/project/'+pid+'/file?path=root'+parent_node,changeFileHolder,httpOptions).pipe(
      catchError(this.handleError(6))
    );
  }
  //5.3新建文档：POST / filemanagers / {fname} / project / {pid} / file?path=...
  createFile(createFileHolder:CreateFileHolder,file_fname:string,pid:number,parent_node:string):Observable<message>{
    return this.http.post<message>(this.api_url.getFileManage()+'/'+file_fname+'/project/'+pid+'/file?path=root'+parent_node,(createFileHolder),httpOptions).pipe(
      catchError(this.handleError(6)
    ));
  }

  //5.4删除文档：DELETE / filemanagers / {fname} / project / {pid} / file?path=...
  deleteFile(file_fname:string,pid:number,parent_node:string):Observable<message>{
    //alert('name:  '+file_fname+'pid:  '+pid+'parent_node:'+parent_node);
    return this.http.delete<message>(this.api_url.getFileManage()+'/'+file_fname+'/project/'+pid+'/file?path=root'+parent_node,httpOptions).pipe(
      catchError(this.handleError(6))
    );
  }

  //6.1查看目录下所有文件:GET menus / project / {pid} / path?path=...
  getMenus(parent_node:string,pid :number)
  {
    return this.http.get<message>(this.api_url.getMenuManage()+'/project/'+pid+'/path?path=root'+parent_node,httpOptions).pipe(
      catchError(this.handleError(6))
    );
  }
  ////6.2 文档重命名：PATCH / menus / {fname} / project / {pid} / filepaths?path=...
  renameFile(renameFileHolder:RenameFileHolder, file_fname:string,pid:number,parent_node:string):Observable<message>{
    return this.http.patch<message>(this.api_url.getMenuManage()+'/'+file_fname+'/project/'+pid+'/filepaths?path=root'+parent_node,(renameFileHolder), httpOptions).pipe(
      catchError(this.handleError(6))
    );
  }
  private log(message: string) {
    alert(`HeroService: ${message}`);
  }
}
