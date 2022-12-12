import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInfo } from 'src/app/models/UserInfo.dto';
import { CrendentialsService } from 'src/app/_services/crendentials.service';
import { HttpService } from 'src/app/_services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  userLoggedIn = false;
  subscription!: Subscription;
  users: UserInfo[] | null = [];

  constructor(
    private credentialsService: CrendentialsService,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.credentialsService.checkUserLoggedIn();
    this.subscription = this.credentialsService.isUserLoggedIn$.subscribe({
      next: (isLogged) => {
        this.userLoggedIn = isLogged;
      },
    });
    console.log(this.userLoggedIn);

    //Second way: Getting users from Firebase database:
    if (this.users?.length === 0) {
      this.httpService.getUsersFromFirebase();
      this.subscription = this.httpService.usersInfo$.subscribe((usersData) => {
        if (usersData && usersData?.length > 0) {
          console.log(usersData);
          this.users = usersData;
        }
      });
    }
  }

  onClickHandler = (user: UserInfo) => {
    console.log(user);
    this.router.navigate([`/user-detail/${user.username}`, user]);
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
