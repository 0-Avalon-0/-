import { HttpHeaders } from '@angular/common/http';
export class ApiService {
    getUrl(): string {
        return 'http://101.201.237.50:8080/FileSystem';
    }
    getHeaders(): HttpHeaders {
        return new HttpHeaders({ 'Content-Type': 'application/json'});
    }
    getLogUrl():string{
        return this.getUrl()+"/accounts";
    }
    getRegistUrl():string{
        return this.getUrl()+"/accounts";
    }
    getPersonManage():string{
        return this.getUrl()+"/datamanagers";
    }
    getProjectManage():string{
        return this.getUrl()+"/projectsettings";
    }
    getFileManage():string{
        return this.getUrl()+"/filemanagers";
    }
    getMenuManage():string{
        return this.getUrl()+"/menus";
    }
}