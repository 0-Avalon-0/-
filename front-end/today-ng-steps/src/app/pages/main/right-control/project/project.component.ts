import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit {

  constructor(   private activatedRoute: ActivatedRoute) { }
  page="project建议";
  listitle="工程"
  pid:string
  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => { 
      this.pid = this.activatedRoute.snapshot.params['pid'];


      
     }); 
  }

}
