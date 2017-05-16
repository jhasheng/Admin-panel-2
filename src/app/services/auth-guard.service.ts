import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth'; 
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable()
export class AuthGuardService implements CanActivate { 

  user: Observable<firebase.User>;

  constructor(af: AngularFireAuth, private router: Router) {
    this.user = af.authState;
  }

  canActivate(): Observable<boolean> {
    return Observable.from(this.user)
      .take(1)
      .map(state => !!state)
      .do(authenticated => {

      if (!authenticated) {
        this.router.navigate([ '/login' ]);
      }

    })
  }

}
