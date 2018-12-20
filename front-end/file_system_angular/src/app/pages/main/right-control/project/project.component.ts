import { Component, OnInit, DoCheck, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Files, File } from '../../../../../domain/file';
import { FileService } from '../../../../services/file/file.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) { }
  page = "project建议";
  listitle = "工程"
  pid: string;
  _pid: number;
  files: Files[];
  file: Files;
  selectedFile: Files;
  parent_node = '';
  private destroy$ = new Subject();

  clickSelectedFile(i: number): void {
    this.fileService.setCurrentIndex(i);
    this.selectedFile = this.files[i];
    if (this.selectedFile.file_property == 0) {
      this.router.navigate(['file']);
    }
    else if (this.selectedFile.file_property == 1) {
      this.parent_node += '/';
      this.parent_node += this.selectedFile.file_fname;
      this.fileService.getMenus(this.parent_node, this._pid);
      this.fileService.files$.pipe(takeUntil(this.destroy$)).subscribe(files=>{
        this.files = files;
      });
    }
  }


  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {

      this.pid = this.activatedRoute.snapshot.params['pid'];
      this._pid = parseInt(this.pid);
      this.fileService.setPid(this._pid);
      this.fileService.getMenus(this.parent_node, this._pid);
      this.fileService.files$.pipe(takeUntil(this.destroy$)).subscribe(files=>{
        this.files = files;
      });
      
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
      

      //???????????????????????
    });
  }

}
