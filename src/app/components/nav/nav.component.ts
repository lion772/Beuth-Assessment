import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/User.dto';
import { CrendetialsService } from 'src/app/_services/crendetials.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  active = 1;
  userLoggedIn = false;
  signIn = false;
  constructor(private credentialsService: CrendetialsService) {}

  ngOnInit(): void {
    this.credentialsService.userCredentials$.subscribe({
      next: (_) => {
        if (localStorage.getItem('token')) {
          this.userLoggedIn = true;
        }
      },
      error: (err) => console.log(err),
    });
  }

  switchToLogin() {
    this.signIn = true;
  }

  onSubmitHandler(form: NgForm) {
    if (!this.signIn) {
      console.log('signup');
      const credentials = { ...form.value, returnSecureToken: true };
      this.credentialsService.signup(credentials);
    } else {
      console.log('signin');
      const credentials = { ...form.value, returnSecureToken: true };
      //this.credentialsService.signin(credentials);
    }
  }

  onLogoutHandler() {
    this.credentialsService.logout();
    this.credentialsService.isUserLoggedIn$.subscribe(
      (isLogged) => (this.userLoggedIn = isLogged)
    );
  }
}
