import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../_services/user.service';
import { UserInfo } from '../../models/UserInfo.dto';
import { HttpService } from 'src/app/_services/http.service';
import { CrendentialsService } from 'src/app/_services/crendentials.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = '';

  constructor() {}

  public ngOnInit(): void {
    this.title = 'Welcome new fellows';

    //First way: Getting dummy data from user.service.ts:
    /* this.userService.getUsers();
    this.subscription = this.userService.users$.subscribe((data) => {
      data ? (this.users = data) : (this.users = null);
    }); */
  }
}
