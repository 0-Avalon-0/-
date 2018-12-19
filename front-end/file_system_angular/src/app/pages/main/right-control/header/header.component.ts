import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RankBy } from '../../../../../domain/type';
import { ListService } from '../../../../services/list/list.service';
import { Input } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { USERNAME } from 'src/app/services/local-storage/local-storage.namespace';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.less' ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  @Input()listTitle :string;
  time:string;
  username:string;
  completedHide = false;  
  hour:number;
  warm:string;
  @Input() routerNavigate:string;
  @Input() suggetContent: string;
  constructor(
    private listService: ListService,
    private store:LocalStorageService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.username = this.store.get(USERNAME);
    var myDate = new Date();
    this.hour=myDate.getHours();
    if(this.hour>6&&this.hour <9)
    {
      this.time="早晨"
    }
    else if(this.hour<=6 ||this.hour>=18)
    {
      this.time="晚上"
      this.warm="下班了，"
    }
    else if(this.hour>=9&& this.hour<=11)
    {
      this.time="上午"
    }
    else if(this.hour>=11 && this.hour<=13)
    {
      this.time="中午";
      this.warm="到了中午了该吃饭了"
   }
   else if(this.hour>=13 && this.hour<=18)
   {
     this.time="下午"
   }
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  goto():void{
    alert(123)
    this._router.navigate([this.routerNavigate]);
  }
}
