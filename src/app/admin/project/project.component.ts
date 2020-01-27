import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectService } from '../project/project.service';
import { StorageService } from '../../shared/storage.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [ProjectService, StorageService]

})
export class ProjectComponent implements OnInit {
  createProjectData: FormGroup;
  projectSubscription$: Subscription;
  setMessage: any = {};
  successMsg: boolean = false;
  errorMsg: boolean = false;
  msg: String;
  status: String;

  constructor(private formBuilder: FormBuilder,
    private router: Router, private _projectService: ProjectService, private _storage: StorageService) { }


    ngOnInit() { this.createProjectData = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(1)]],
      departmentName:['',[Validators.required,Validators.minLength(2)]],
      projectName:['',[Validators.required,Validators.minLength(2)]]
    });
    sessionStorage.clear();
  }

  onSubmit() {

    if (this.createProjectData.invalid) {
      return;
    }

    this.projectSubscription$ = this._projectService.createProject(this.createProjectData.value).subscribe(resp => {
      console.log("response Object ", resp);
      this.msg = resp.msg;
      this.status=resp.status.toUpperCase();
      if(this.status=='ERROR'){
        this.successMsg=false;
        this.router.navigate(['/admin']);
        this.errorMsg=true;
      }else if(this.status=='SUCCESS'){
        this.errorMsg=false;
        this.successMsg=true;
      }
      {
        this.setMessage = { message: resp.errorMessage, error: true };
      }
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  }
}
