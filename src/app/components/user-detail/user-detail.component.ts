import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrendetialsService } from 'src/app/_services/crendetials.service';
import { UserInfo } from '../../models/UserInfo.dto';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  defaultPicture = '../../../assets/no-profile-img.jpg';
  actualLevel: number = 1;
  userFound?: UserInfo | null;
  isUserLoggedin = false;
  constructor(
    private credentialsService: CrendetialsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log('PARAMS: ', params);
      this.defaultPicture = params['picturePath'];
      this.userFound = params as UserInfo;
      this.actualLevel = params['userLevel'];
    });

    this.credentialsService.isUserLoggedIn$.subscribe((isLoggedin) => {
      if (!isLoggedin) this.router.navigate(['/']);
      this.isUserLoggedin = isLoggedin;
    });
  }
}
