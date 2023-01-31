import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrendentialsService } from './_services/crendentials.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'beuth-app';

  constructor(
    private credentialsService: CrendentialsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setCurrentUser();
    this.credentialsService.userCredentials$.subscribe({
      next: (user) => {
        user
          ? this.router.navigate(['/login'])
          : this.router.navigate(['/auth']);
      },
      error: (err) => console.log(err),
    });
  }

  setCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return;
    this.credentialsService.setCurrentUser(JSON.parse(userStr));
  }
}
