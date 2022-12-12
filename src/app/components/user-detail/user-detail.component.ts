import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User.dto';
import { CrendentialsService } from 'src/app/_services/crendentials.service';
import { HttpService } from 'src/app/_services/http.service';
import { UserInfo } from '../../models/UserInfo.dto';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  defaultPicture = '../../../assets/no-profile-img.jpg';
  actualLevel: number = 1;
  userFound?: UserInfo | null;
  isUserLoggedin = false;
  isLoading = false;
  users: UserInfo[] = [];
  subscriptionLogin!: Subscription;
  subscriptionUsers!: Subscription;

  constructor(
    private credentialsService: CrendentialsService,
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.credentialsService.checkUserLoggedIn();
    this.subscriptionLogin = this.credentialsService.isUserLoggedIn$.subscribe({
      next: (isLogged) => {
        this.isUserLoggedin = isLogged;
      },
    });
    this.httpService.getUsersFromFirebase();
    this.subscriptionUsers = this.httpService.usersInfo$.subscribe((users) => {
      if (users && users?.length > 0) {
        this.users = users;
        this.route.params.subscribe((params) => {
          this.userFound = this.users.find(
            (user) => user.username === params['username']
          );
          this.isLoading = false;
        });
      }
    });

    this.credentialsService.isUserLoggedIn$.subscribe((isLoggedin) => {
      if (!isLoggedin) this.router.navigate(['/auth']);
      this.isUserLoggedin = isLoggedin;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionLogin.unsubscribe();
    this.subscriptionUsers.unsubscribe();
  }
}
