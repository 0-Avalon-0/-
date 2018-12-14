import { Component, OnInit } from '@angular/core';
import { List } from 'src/domain/entities';
import { ListService } from 'src/app/services/list/list.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-allproject',
  templateUrl: './allproject.component.html',
  styleUrls: ['./allproject.component.less']
})
export class AllprojectComponent implements OnInit {
  lists: List[];
  constructor(private listService: ListService,) { 
  }
  page="allproject建议"
  private destroy$ = new Subject();
  listitle="查看所有工程"
  ngOnInit() {
    this.listService.InitAllproject();
    this.listService.lists$
    .pipe(takeUntil(this.destroy$))
    .subscribe(lists => {
      this.lists = lists;
    });
    
  }
}
