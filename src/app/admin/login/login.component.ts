import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { Router } from '@angular/router';

import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';



declare var $: any;
declare var Materialize: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})


export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;

  email: string;
  password: any;
  error: any;

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });



  constructor (private af: AngularFireAuth, private router: Router, public fb: FormBuilder) {

    this.user = af.authState;

    this.af.authState.subscribe(
    (user) => {
      if (user != null) {
        this.email = user.email;
        this.router.navigateByUrl('/dashboard');
        console.log('You are loged in');
      } else {
        this.router.navigate(['/login']);
      }

    });
  }



  loginWithEmailAndPassword() {

    const formData = this.loginForm.value;

    this.email = this.loginForm.controls.email.value
    this.password = this.loginForm.controls.password.value

    this.af.auth.signInWithEmailAndPassword(this.email, this.password)
  }


  loginWithGoogle() {
     this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.af.auth.signOut();
  }

  ngOnInit() {

  }

}
