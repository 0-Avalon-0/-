import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from '../../../../../../domain/entities';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: [ './suggest.component.less' ]
})
export class SuggestComponent implements OnInit, OnDestroy {
  suggestedTodo: Todo[] = [];

  constructor(
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
