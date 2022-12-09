import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.dto';
import { CrendentialsService } from 'src/app/_services/crendentials.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  active = 1;
  userLoggedIn = false;
  signIn = false;
  error!: string;
  isSubmitted = false;

  constructor(
    private credentialsService: CrendentialsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.credentialsService.userCredentials$.subscribe({
      next: (_) => {
        if (localStorage.getItem('token')) {
          this.userLoggedIn = true;
        }
      },
    });
  }

  async onSubmitHandler(form: NgForm) {
    this.isSubmitted = true;
    if (!this.signIn) {
      console.log('signup');
      const credentials = { ...form.value, returnSecureToken: true };
      this.credentialsService.signup(credentials);
    } else {
      console.log('signin');
      const credentials = { ...form.value, returnSecureToken: true };
      const res = await this.credentialsService.signin(credentials);
      console.log('RESPONSE: ', res);
    }
    this.router.navigate(['/']);
  }

  onLogoutHandler() {
    this.credentialsService.logout();
    this.credentialsService.isUserLoggedIn$.subscribe(
      (isLogged) => (this.userLoggedIn = isLogged)
    );
  }
}
