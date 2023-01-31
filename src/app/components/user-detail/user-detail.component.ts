import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
    public credentialsService: CrendentialsService,
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.httpService.getUsersFromFirebase();
    this.subscriptionUsers = this.httpService.usersInfo$.subscribe((users) => {
      if (users && users?.length > 0) {
        this.users = users;
        this.route.params.subscribe((params) => {
          console.log(params);

          this.userFound = this.users.find(
            (user) => user.username === params['username']
          );
          console.log(this.userFound);
          this.isLoading = false;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionUsers.unsubscribe();
  }
}
