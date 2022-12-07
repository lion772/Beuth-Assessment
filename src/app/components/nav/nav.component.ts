import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  active = 1;
  constructor() {}

  ngOnInit(): void {}

  onSubmitHandler(form: NgForm) {
    const { login, password } = form.value;
    console.log(login, password);
  }
}
