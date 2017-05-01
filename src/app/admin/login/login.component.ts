import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: any;

  constructor(public af: AngularFire, private router: Router) { 
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.router.navigateByUrl('/prosfores');
        console.log('You are loged in');
        console.log(auth);
      };
    });
  }

  // LOGIN METHOD
  login() {
    this.af.auth.login();
  }

  ngOnInit() {
  }

}
