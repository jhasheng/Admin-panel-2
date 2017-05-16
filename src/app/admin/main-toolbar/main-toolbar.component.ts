import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent implements OnInit {
  
  isDarkTheme = false;
  user: Observable<firebase.User>;

  email: any;

  constructor(public af: AngularFireAuth, private router: Router) {

    // CHECK USER STATE
    this.af.authState.subscribe(auth => {

      this.af.authState.subscribe(
    (user) => {
      if (user != null) {
        this.email = user.email;
        // console.log(user);
      } else {
        this.router.navigate(['/login']);
      }
    });

    });

  }

  ngOnInit() {
  }

  // LOGOUT METHOD
  logout() {
     this.af.auth.signOut();
     this.router.navigateByUrl('/login'); // des ama afto einai aparetito
  }

}
