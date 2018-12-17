import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.less']
})
export class PersonComponent implements OnInit {

  constructor() { }
  page="person建议"
  listitle="个人信息"
  ngOnInit() {
  }

}
