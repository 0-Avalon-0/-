import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor() { }
  page="您可以左侧导航栏切换选项";
  listitle="Get Started!"
  navigateTo="/setting"
  ngOnInit() {
  }
  current = 0;
  index = 'First-content';

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  done(): void {
    console.log('done');
  }


}
