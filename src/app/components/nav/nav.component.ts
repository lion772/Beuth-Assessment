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
  constructor(private credentialsService: CrendetialsService) {}

  ngOnInit(): void {
    this.credentialsService.userCredentials$.subscribe({
      next: (_) => {
        if (localStorage.getItem('token')) {
          this.userLoggedIn = true;
          console.log('USER IS LOGGED IN! UHUU!', this.userLoggedIn);
        }
      },
      error: (err) => console.log(err),
    });
  }

  onSubmitHandler(form: NgForm) {
    const credentials = { ...form.value, returnSecureToken: true };
    this.credentialsService.signup(credentials);
  }

  onLogoutHandler() {
     this.credentialsService.logout();
     this.credentialsService.isUserLoggedIn$.subscribe(isLogged => this.userLoggedIn = isLogged)
  }
}
