import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor() { }
  page="主页面显示，包括网页主页，项目管理，用户信息，文件管理，可通过点击左侧导航键进行相关操作";
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
