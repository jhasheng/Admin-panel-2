import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent implements OnInit {

  email: any;

  constructor(public af: AngularFire, private router: Router) {

    // CHECK USER STATE
    this.af.auth.subscribe(auth => {

      if (auth) {
        this.email = auth;
        console.log('You are loged in');
      } else {
        this.router.navigate(['/home']);
        console.log('You are not not log in');
      }

    });

  }

  ngOnInit() {
  }

  // LOGOUT METHOD
  logout() {
    this.af.auth.logout();
  }

}
