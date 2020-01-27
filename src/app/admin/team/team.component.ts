import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeamService } from '../../module-service/team.service';
import { StorageService } from '../../shared/storage.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  providers: [TeamService, StorageService]
})
export class TeamComponent implements OnInit {

  createTeamData: FormGroup;
  teamSubscription$: Subscription;
  setMessage: any = {};
  successMsg: boolean = false;
  errorMsg: boolean = false;
  msg: String;
  status: String;

  constructor(private formBuilder: FormBuilder,
    private router: Router, private _teamService: TeamService, private _storage: StorageService) { }


  ngOnInit() {
    this.createTeamData = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(1)]],
      departmentName: ['', [Validators.required, Validators.minLength(2)]],
      projectName: ['', [Validators.required, Validators.minLength(2)]],
      teamName: ['', [Validators.required, Validators.minLength(2)]]
    });
    sessionStorage.clear();
  }
  onSubmit() {
    if (this.createTeamData.invalid) {
      return;
    }

    this.teamSubscription$ = this._teamService.createTeam(this.createTeamData.value).subscribe(resp => {
      console.log("response Object ", resp);
      this.msg = resp.msg;
      this.status = resp.status.toUpperCase();
      if (this.status == 'ERROR') {
        this.successMsg = false;
        this.router.navigate(['/admin']);
        this.errorMsg = true;
      } else if (this.status == 'SUCCESS') {
        this.errorMsg = false;
        this.successMsg = true;
      }

      {
        this.setMessage = { message: resp.errorMessage, error: true };
      }
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  }

}
