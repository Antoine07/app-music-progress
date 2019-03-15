import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { environment } from '../environments/environment.dev';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authState: boolean;

  // event si on change le status
  constructor(private router: Router) {
    firebase.auth().onAuthStateChanged(user => {
      this._authState = user ? true : false;
    });
  }

  authenticated(): boolean { return this._authState; }

  auth(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  // Pour tester l'authentification
  testAuth() {
    firebase.auth().signInWithEmailAndPassword(environment.login, environment.password)
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      }).then(status => console.log(status));
  }

  logout() {
    return firebase.auth().signOut().then(
      () => {
        this.router.navigate(['/albums'], { queryParams: { message: 'Success logout !' } })
      }
    );
  }
}
